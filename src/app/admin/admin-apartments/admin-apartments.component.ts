import { Component, OnInit, TemplateRef } from '@angular/core';
import { DistrictService } from 'src/app/shared/services/district.service';
import { ApartmentService } from 'src/app/shared/services/apartment.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { IApartments } from 'src/app/shared/interfaces/apartment.interface';
import { Observable } from 'rxjs';
import { IDistrict } from 'src/app/shared/interfaces/district.interface';
import { Apartment } from 'src/app/shared/models/apartment.model';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-apartments',
  templateUrl: './admin-apartments.component.html',
  styleUrls: ['./admin-apartments.component.scss']
})
export class AdminApartmentsComponent implements OnInit {
  districts: Array<any>;
  apartments: Array<any>;
  district: IDistrict;
  districtName: string;
  location: string;
  map:string;
  area: number;
  price: number;
  rooms: number;
  floor:number;
  currentDate: number = Date.now();
  description: string;
  imageMain: string;
  imageSecond: string;
  imageThird: string;
  imageFourth: string;
  status:boolean;
  apartID: string;
  modalRef: BsModalRef;
  uploadProgress1: Observable<number>;
  uploadProgress2: Observable<number>;
  uploadProgress3: Observable<number>;
  uploadProgress4: Observable<number>;
  apartToDelete: IApartments;
  modalRefConfirm: BsModalRef;
  editStatus: boolean;
  filterApart:string;
  image1:string = 'image1';
  image2:string = 'image2';
  image3:string = 'image3';
  image4:string = 'image4';
  constructor(private distService: DistrictService, private apartService: ApartmentService,
    private afStorage: AngularFireStorage, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getDistricts();
    this.getApartments();
  }
  private getDistricts() {
    this.distService.getFireBaseDisctricts().subscribe(actions => {
      this.districts = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  private getApartments() {
    this.apartService.getFireBaseApartments().subscribe(actions => {
      this.apartments = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  setDistrict(): void {
    const index = this.districts.findIndex(elem => elem.nameUA.toLocaleLowerCase() === this.districtName.toLocaleLowerCase());
    this.district = this.districts[index];
  }
  public addApartment(): void {
    const apart: IApartments = new Apartment(null,
      this.district,
      this.location,
      this.map,
      this.area,
      this.price,
      this.rooms,
      this.floor,
      this.description,
      this.currentDate,
      this.imageMain,
      this.imageSecond,
      this.imageThird,
      this.imageFourth
    );
    delete apart.id;
    this.apartService.addFirebaseApartment(apart)
      .then(() => console.log('add product success'))
      .catch(err => console.log('add product error', err));
    this.resetForm();
    this.modalRef.hide();
  }
  public editApartment(template: TemplateRef<any>, apart: IApartments) {
    this.modalRef = this.modalService.show(template,{ class: 'modal-lg' });
    this.district = apart.district;
    this.districtName = apart.district.nameUA;
    this.location = apart.location;
    this.map = apart.map;
    this.area = apart.area;
    this.price = apart.price;
    this.rooms = apart.rooms;
    this.floor = apart.floor;
    this.description = apart.description;
    this.imageMain = apart.imageMain;
    this.imageSecond = apart.imageSecond;
    this.imageThird = apart.imageThird;
    this.imageFourth = apart.imageFourth;
    this.apartID = apart.id;
    this.status = apart.status;
    this.editStatus = true;
  }

  deleteApartmentConfirm(confirm: TemplateRef<any>, apart: IApartments) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.apartToDelete = apart;
  }

  deleteApartment(): void {
    this.deleteAllImages(this.apartToDelete);
    this.apartService.deleteFirebaseApartment(this.apartToDelete.id)
      .then(() => console.log('delete apart success'))
      .catch(err => console.log('delete apart error', err));
    this.modalRefConfirm.hide();
  }
  private deleteAllImages(id:any):void{
    let img1 = id.imageMain;
    let imgLink1 = img1.slice(img1.indexOf('F')+1,img1.indexOf('?'));
    let storageRef1 = firebase.storage().ref();
    storageRef1.child(`images/${imgLink1}`).delete();
    let img2 = id.imageSecond;
    let imgLink2 = img2.slice(img2.indexOf('F')+1,img2.indexOf('?'));
    let storageRef2 = firebase.storage().ref();
    storageRef2.child(`images/${imgLink2}`).delete();
    let img3 = id.imageThird;
    let imgLink3 = img3.slice(img3.indexOf('F')+1,img3.indexOf('?'));
    let storageRef3 = firebase.storage().ref();
    storageRef3.child(`images/${imgLink3}`).delete();
    let img4 = id.imageFourth;
    let imgLink4 = img4.slice(img4.indexOf('F')+1,img4.indexOf('?'));
    let storageRef4 = firebase.storage().ref();
    storageRef4.child(`images/${imgLink4}`).delete();
  }
  deleteImage(name:string,url: string){
    let imgLink = url.slice(url.indexOf('F')+1,url.indexOf('?'));
    const storageRef = firebase.storage().ref();
    storageRef.child(`images/${imgLink}`).delete();
    url = 'https://firebasestorage.googleapis.com/v0/b/d0thome.appspot.com/o/images%2Fno-default-.png?alt=media&token=3876ee5a-9e6c-4f12-af47-8b1ae234509b';
    this.apartService.updateImage(this.apartID,name);
  }
  saveEditApartment(): void {
    let statusB = Boolean(`${this.status}`);
    const editedApart: IApartments = new Apartment(this.apartID,
      this.district,
      this.location,
      this.map,
      this.area,
      this.price,
      this.rooms,
      this.floor,
      this.description,
      this.currentDate,
      this.imageMain,
      this.imageSecond,
      this.imageThird,
      this.imageFourth,
      statusB);
    delete editedApart.id;
    this.apartService.updateFirebaseApartment(editedApart, this.apartID)
      .then(() => console.log('update product success'))
      .catch(err => console.log('update product error', err));
    this.apartID = '';
    this.resetForm();
    this.modalRef.hide();
  }
  uploadImageFirst(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress1 = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageMain = url;
      });
    });
  }
  uploadImageSecond(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress2 = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageSecond = url;
      });
    });
  }
  uploadImageThird(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress3 = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageThird = url;
      });
    });
  }
  uploadImageFourth(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress4 = task.percentageChanges();
    task.then(e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe(url => {
        this.imageFourth = url;
      });
    });
  }
  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    this.editStatus = false;
    this.resetForm();
  }

  decline(): void {
    this.modalRefConfirm.hide();
  }
  private resetForm() {
    this.districtName = '';
    this.location = '';
    this.map = '',
    this.area = null;
    this.price = null;
    this.rooms = null;
    this.floor = null;
    this.description = '';
    this.imageMain = '';
    this.imageSecond = '';
    this.imageThird = '';
    this.imageFourth = '';
  }
}
