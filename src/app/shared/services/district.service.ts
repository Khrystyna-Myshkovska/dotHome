import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  constructor(private firestore: AngularFirestore) {}
  getFireBaseDisctricts(){
    return this.firestore.collection('districts').snapshotChanges();
  }
  addFirebaseDistrict(disctrict: any): Promise<DocumentReference>  {
    return this.firestore.collection('districts').add({...disctrict});
  }

  deleteFirebaseDistrict(id: string): Promise<void> {
    return this.firestore.collection('districts').doc(id).delete();
  }

  updateFirebaseDistrict(disctrict: any, id: string): Promise<void> {
    return this.firestore.collection('districts').doc(id).update({...disctrict});
  }
}
