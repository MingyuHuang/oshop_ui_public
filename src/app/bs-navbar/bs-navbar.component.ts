import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Client, Stomp } from '@stomp/stompjs';

import { lastValueFrom, Observable } from 'rxjs';

import { ShoppingCart } from '../dto/shopping-cart';
import { User } from '../dto/user';
import { LoginComponent } from '../login/login.component';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';

import { AuthenticationService } from '../services/authentication.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  user$!: Observable<User> | null;
  cart$!: Observable<ShoppingCart>;

  constructor(private authService: AuthenticationService,
    private cartService: ShoppingCartService,
    private modalService: NgbModal) {

  }
  async ngOnInit() {

    this.user$ = this.authService.currentUser;
    await this.cartService.pushCartToQueue();
    this.cart$ = this.cartService.getCart();
  }

  logout() {
    this.user$ = null;
    this.authService.logout();
  }

  isLoggedIn(): boolean {

    return this.authService.isLoggedIn();
  }

  open() {

    this.modalService.open(LoginModalComponent).result.then((result) => {
      if ('Github' === result) {
        this.authService.oauth2Login();
      }
    });
  }

}
