import { Component, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/shared/services/apartment.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { NgForm} from '@angular/forms';
import { RequestService } from 'src/app/shared/services/request.service';
import { IRequest } from 'src/app/shared/interfaces/request.interface';
import { Request } from 'src/app/shared/models/request.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-apartment-details',
  templateUrl: './apartment-details.component.html',
  styleUrls: ['./apartment-details.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 2000, noPause: false, showIndicators: true } }
  ]

})
export class ApartmentDetailsComponent implements OnInit {
  viewApartment: any = null;
  showLocation: boolean;
  userInfo:any;
  userName: string;
  email: string;
  phone: number;
  textRequest:string;
  constructor(private apartService: ApartmentService, private activeRoute: ActivatedRoute, 
    private requestService:RequestService,private userService: UserService) { }

  ngOnInit(): void {
    this.getOneApartment();
    this.checkUser();
  }
  private getOneApartment() {
    const id = this.activeRoute.snapshot.paramMap.get('id');
    this.apartService.getFireBaseApartmentDetails(id)
      .then(serviceResponse => {
        this.viewApartment = serviceResponse.data();
        this.textRequest =  `Мене цікавить об'єкт за адресою: ${this.viewApartment.location}.`
      })
  }
  private checkUser(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.role === 'user') {
        this.userService.getOneUserInfo(user.userEmail).subscribe(
          data => {
            this.userInfo = data;
            this.userInfo = this.userInfo[0];
           this.userName = this.userInfo.name;
           this.email = this.userInfo.userEmail;
           this.phone = this.userInfo.phone;
          });
      }
    }
  }
  public showMap(): void {
    this.showLocation = true;
  }
  public closeMap(): void {
    this.showLocation = false;
  }
  sendRequest(form: NgForm) {
    const newRequest:IRequest = new Request(
      null,
      form.value.userName,
      form.value.email,
      form.value.phone,
      form.value.textRequest,
      this.viewApartment,
    )
    delete newRequest.id;
    console.log(newRequest);
    this.requestService.addRequest(newRequest)
    .then(() => console.log('add newRequest success'))
    .catch(err => console.log('add newRequest error', err));
    this.resetForm();
  }
  private resetForm() {
    this.userName = '';
    this.email = '';
    this.phone = null;
    this.textRequest = `Мене цікавить об'єкт за адресою: ${this.viewApartment.location}.`
  }
}

