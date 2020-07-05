import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import 'firebase/firestore';


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private firestore: AngularFirestore) { }

  getRequest(){
    return this.firestore.collection('requests').snapshotChanges();
  }
  addRequest(request: any): Promise<DocumentReference>  {
    return this.firestore.collection('requests').add({...request});
  }

  deleteRequest(id: string): Promise<void> {
    return this.firestore.collection('requests').doc(id).delete();
  }
}
