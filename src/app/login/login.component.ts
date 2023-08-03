import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any = {};

  ngOnInit(): void {

  }

  constructor(private authService: AuthenticationService, private modalService: NgbModal) {

  }

  oauth2Login() {
    this.authService.oauth2Login();
  }

  usernameCredentialsLogin() {
    this.authService.userNameCredentialsLogin(this.loginForm);
  }


  open() {

    this.modalService.open(LoginModalComponent).result.then((result) => {
      if ('Github' === result) {
        this.authService.oauth2Login();
      } else {
        this.authService.register(result);
      }
    });
  }

}
