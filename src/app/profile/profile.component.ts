import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { UserService } from '../shared/services/user.service';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/models/user.model';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = JSON.parse(localStorage.getItem('user'));
  userInfo: any;
  userEmail: string = this.user.userEmail;
  userName: string;
  userPhone: string;
  userCity: string;
  userImage: string;

  uploadProgress: Observable<number>;
  modalRef: BsModalRef;
 
  name: string;
  phone: string;
  city: string;

  editStatus:boolean;
  constructor(private modalService: BsModalService, private afStorage: AngularFireStorage,
    private auth: AuthService, private userService: UserService) { }
  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.userService.getOneUserInfo(this.userEmail).subscribe(
      data => {
        this.userInfo = data;
        this.userInfo = this.userInfo[0];
        this.name = this.userInfo.name;
        this.phone = this.userInfo.phone;
        this.city = this.userInfo.city;
        if(this.userInfo.image === ''){
          this.userImage = 'https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-';
        }else{
          this.userImage = this.userInfo.image;
        }
      });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.userName = this.userInfo.name;
    this.userPhone = this.userInfo.phone;
    this.userCity = this.userInfo.city;
    this.userImage = this.userInfo.image;
    this.editStatus = true;
  }
  AddNewInfo(): void {
    const addUserInfo: IUser = new User(
      this.userName,
      this.userPhone,
      this.userCity,
      this.userImage
    )
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.updateUserInfo(addUserInfo);
    this.resetForm();
    this.modalRef.hide();
  }
 
  deleteImage(url: string){
    let start = url.indexOf('F')+1;
    let end = url.indexOf('?');
    let imgLink = url.slice(start,end);
    const storageRef = firebase.storage().ref();
    storageRef.child(`images/${imgLink}`).delete();
    this.userImage = 'https://www.learning.uclg.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg?itok=PANMBJF-';
    this.userService.updateUserImg('');
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.userImage = url;
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
 
  private resetForm(): void {
    this.userName = '';
    this.userPhone = '';
    this.userCity = '';
  }
  logOut():void{
    this.auth.logOut();
  }
}
