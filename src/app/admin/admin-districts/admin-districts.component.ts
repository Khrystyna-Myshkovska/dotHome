import { Component, OnInit, TemplateRef } from '@angular/core';
import { DistrictService } from 'src/app/shared/services/district.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IDistrict } from 'src/app/shared/interfaces/district.interface';
import { District } from 'src/app/shared/models/district.model';

@Component({
  selector: 'app-admin-districts',
  templateUrl: './admin-districts.component.html',
  styleUrls: ['./admin-districts.component.scss']
})
export class AdminDistrictsComponent implements OnInit {
  districts: Array<any> = [];
  disctrictNameUA: string;
  disctrictNameEN: string;
  disctrictId: string;
  modalRef: BsModalRef;
  districtToDelete: IDistrict;
  modalRefConfirm: BsModalRef;
  editStatus: boolean;
  constructor(private distService: DistrictService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getDistricts();
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
  public addDisctrict(): void {
    const district: IDistrict = new District(null,this.disctrictNameUA, this.disctrictNameEN);
    delete district.id;
    this.distService.addFirebaseDistrict(district)
      .then(() => console.log('add blog success'))
      .catch(err => console.log('add blog error', err));
    this.resetForm();
  }
  public deleteDistrictConfirm(confirm: TemplateRef<any>, district: IDistrict) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.districtToDelete = district;
  }
  public deleteDistrict(): void {
    this.distService.deleteFirebaseDistrict(this.districtToDelete.id)
      .then(() => console.log('delete district success'))
      .catch(err => console.log('delete district error', err));
    this.modalRefConfirm.hide();
  }
  public editDisctrict(template: TemplateRef<any>, district: IDistrict) {
    this.modalRef = this.modalService.show(template);
    this.disctrictId = district.id;
    this.disctrictNameUA = district.nameUA;
    this.disctrictNameEN = district.nameEN;
    this.editStatus = true;
  }
  public saveEditDistrict():void{
    const editedDistrict: IDistrict = new District(this.disctrictId,this.disctrictNameUA, this.disctrictNameEN);
    delete editedDistrict.id;
    this.distService.updateFirebaseDistrict(editedDistrict, this.disctrictId)
      .then(() => console.log('update product success'))
      .catch(err => console.log('update product error', err));
    this.disctrictId = '';
    this.resetForm();
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editStatus = false;
    this.resetForm();
  }
  decline(): void {
    this.modalRefConfirm.hide();
  }
  private resetForm() {
    this.disctrictNameUA = '';
    this.disctrictNameEN = '';
  }
}
