import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;
  modalRef: BsModalRef;
  login: string;
  password: string;
  textMenu: string = 'Меню';
 
  constructor(private auth: AuthService, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.checkUser();
    this.checkLocalUser();
  }

  openMenu(): void {
    if (this.textMenu === 'Меню') {
      this.textMenu = 'Закрити';
    }
    else {
      this.textMenu = 'Меню';
    }
  }
  
  private checkUser(): void {
    this.auth.userStatusChanges.subscribe(
      () => {
        this.checkLocalUser();
      }
    )
  }
  private checkLocalUser(): void {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user !== null) {
      if (user.role === "admin") {
        this.urlLogin = 'admin';
        this.pageLogin = 'адмін';
      } else {
        this.urlLogin = 'profile';
        this.pageLogin = 'профіль';
      }
      this.statusLogin = true;
    } else {
      this.statusLogin = false;
      this.urlLogin = '';
      this.pageLogin = '';
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    if (this.textMenu === 'Меню') {
      this.textMenu = 'Закрити';
    }
    else {
      this.textMenu = 'Меню';
    }
  }
  signIn(): void {
    this.auth.signIn(this.login, this.password);
    this.resetForm();
  }

  signUp(): void {
    this.auth.signUp(this.login, this.password);
    this.resetForm();
  }
  private resetForm(): void {
    this.login = '';
    this.password = '';
    this.modalRef.hide();
  }

}
