import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {
  constructor(private firestore: AngularFirestore) { }
  getFireBaseApartments() {
    return this.firestore.collection('apartments').snapshotChanges();
  }
  addFirebaseApartment(apart: any): Promise<DocumentReference> {
    return this.firestore.collection('apartments').add({ ...apart });
  }

  deleteFirebaseApartment(id: string): Promise<void> {
    return this.firestore.collection('apartments').doc(id).delete();
  }

  updateFirebaseApartment(apart: any, id: string): Promise<void> {
    return this.firestore.collection('apartments').doc(id).update({ ...apart });
  }
  getFireBaseApartmentDetails(id: string) {
    return this.firestore.collection('apartments').doc(id).get().toPromise();
  }

  updateImage(id:string,name:string){
    let  defaultImage:string = 'https://firebasestorage.googleapis.com/v0/b/d0thome.appspot.com/o/images%2Fno-default-.png?alt=media&token=3876ee5a-9e6c-4f12-af47-8b1ae234509b';
    if(name === 'image1'){
      return this.firestore.collection('apartments').doc(id).update({
        "imageMain": defaultImage    
      })
    }else if(name === 'image2'){
      return this.firestore.collection('apartments').doc(id).update({
        "imageSecond": defaultImage
      })
    }else if (name === 'image3'){
      return this.firestore.collection('apartments').doc(id).update({
        "imageThird": defaultImage
      })
    }else if (name === 'image4'){
      return this.firestore.collection('apartments').doc(id).update({
        "imageFourth": defaultImage
      })
    }
  }
  getSortedByAddress(add: string) {
    return this.firestore.collection<any>('apartments', ref => ref.where('location', '>=', add)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  getSortedByDistrict(district: string) {
    return this.firestore.collection<any>('apartments', ref => ref.where('district.nameUA', '==', district)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getRooms(countRooms: number) {
    console.log(countRooms);
    return this.firestore.collection<any>('apartments', ref => ref.where('rooms', '==', countRooms)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        console.log(data);
        return { id, ...data };
      }))
    );
  }
}
