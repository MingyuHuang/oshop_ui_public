import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../dto/order';
import { ShoppingCart } from '../dto/shopping-cart';
import { User } from '../dto/user';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {

  @Input('cart') cart!: ShoppingCart;

  shipping: any = {};
  user!: User;
  userSubscription!: Subscription;

  constructor(private router: Router, private authService: AuthenticationService, private orderService: OrderService) {

  }
  ngOnInit(): void {
    this.userSubscription = this.authService.currentUser.subscribe(user => this.user = user);
  }



  async placeOrder() {
    let orderObject = { userId: this.user.id, shipping: this.shipping, shoppingCart: this.cart };
    let order = new Order(orderObject);
    let result = await this.orderService.placeOrder(order);
    // pass orderId(result.id) to orderService.pay(orderId)
    this.orderService.pay(result.id).subscribe(response => {
      document.write(response.data.form);
    })
    // this.router.navigate(['/order-success']);
  }

  ngOnDestroy() {

    this.userSubscription.unsubscribe();
  }

}
