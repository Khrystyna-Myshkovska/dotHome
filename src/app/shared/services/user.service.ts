import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentId: string;
  constructor(private firestore: AngularFirestore) { }

  getOneUserInfo(email: string) {
    return this.firestore.collection<any>('users', ref => ref.where('userEmail', '==', email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        this.currentId = id;
        return { id, ...data };
      }))
    );
  }
  updateUserInfo(user: any) {
    return this.firestore.collection('users').doc(`${this.currentId}`).update({
      "name": user.name,
      "phone": user.phone,
      "city": user.city,
      "image": user.image
    });
  }
  updateUserImg(url:string){
    return this.firestore.collection('users').doc(`${this.currentId}`).update({
      "image": url
    })
  }
}
