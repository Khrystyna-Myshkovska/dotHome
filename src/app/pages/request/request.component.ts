import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { RequestService } from 'src/app/shared/services/request.service';
import { IRequest } from 'src/app/shared/interfaces/request.interface';
import { Request } from 'src/app/shared/models/request.model';
import { UserService } from 'src/app/shared/services/user.service';
@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate('1.5s 800ms ease-in')),
    ]),
  ]
})
export class RequestComponent implements OnInit {
  userName: string;
  email: string;
  phone: number;
  textRequest: string;
  apart:any = [];
  userInfo:any;
  constructor(private requestService: RequestService,private userService: UserService) { }

  ngOnInit(): void {
    this.checkUser();
  }
  public sendRequest():void {
    const newRequest: IRequest = new Request(
      null,
      this.userName,
      this.email,
      this.phone,
      this.textRequest,
      this.apart);
    delete newRequest.id;
    this.requestService.addRequest(newRequest)
      .then(() => console.log('add newRequest success'))
      .catch(err => console.log('add newRequest error', err));
    this.resetForm();
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

  private resetForm() {
    this.userName = '';
    this.email = '';
    this.phone = null;
    this.textRequest = '';
  }

}
