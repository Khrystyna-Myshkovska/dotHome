import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;
  checkAdminLogin: boolean;
  checkUserLogin: boolean;
  userStatusChanges: Subject<any> = new Subject;

  constructor( private afAuth: AngularFireAuth, private firestore: AngularFirestore, private router: Router) { }
  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          userEmail: userResponse.user.email,
          id: userResponse.user.uid,
          role: 'user',
          name: '',
          phone: '',
          city: '',
          image: '',
        };
        this.firestore.collection('users').add(user)
          .then(data => {
            data.get().then(newUserInfo => {
              let newUser = newUserInfo.data();
              localStorage.setItem('user', JSON.stringify(newUser));
              if (newUser.role !== "admin") {
                this.userStatusChanges.next('user');
                this.checkUserLogin = true;
                this.router.navigateByUrl('profile')
              }
            });
          })
          .catch(err => console.log('get data firestore collection', err));
      })
      .catch(err => console.log('create user', err));
  }
  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          users => {
            users.forEach(userReferences => {
              this.currentUser = userReferences.data();
              localStorage.setItem('user', JSON.stringify(this.currentUser));
              if (this.currentUser.role !== "admin") {
                this.userStatusChanges.next('user');
                this.checkUserLogin = true;
                this.router.navigateByUrl('profile')
              } else {
                this.checkAdminLogin = true;
                this.userStatusChanges.next('admin');
                this.router.navigateByUrl('admin')
              }
            })
          }
        )
      })
      .catch(err => console.log('user sign in', err));
  }
  logOut() {
    this.afAuth.signOut()
      .then(() => {
        console.log('succsses');
        localStorage.removeItem('user')
        this.userStatusChanges.next('logOut');
        this.checkUserLogin = false;
        this.checkAdminLogin = false;
        this.router.navigateByUrl('home')
      })
      .catch(err => console.log('sign OUT', err));
  }
}
