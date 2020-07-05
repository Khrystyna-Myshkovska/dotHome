import { Component, OnInit, TemplateRef } from '@angular/core';
import { RequestService } from 'src/app/shared/services/request.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IRequest } from 'src/app/shared/interfaces/request.interface';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {
  requests: Array<any> = [];
  requestID: string;
  requestToDelete: IRequest;
  modalRefConfirm: BsModalRef;
  constructor(private requestService: RequestService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getRequests();
  }
  private getRequests() {
    this.requestService.getRequest().subscribe(actions => {
      this.requests = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  public deleteRequestConfirm(confirm: TemplateRef<any>, request: IRequest) {
    this.modalRefConfirm = this.modalService.show(confirm, { class: 'modal-sm' });
    this.requestToDelete = request;
  }
  public delete() {
    this.requestService.deleteRequest(this.requestToDelete.id)
      .then(() => console.log('delete request success'))
      .catch(err => console.log('delete request error', err));
    this.modalRefConfirm.hide();
  }
  decline() {
    this.modalRefConfirm.hide();
  }
}
