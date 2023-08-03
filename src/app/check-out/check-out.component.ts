import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../dto/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$!: Observable<ShoppingCart>;



  constructor(private cartService: ShoppingCartService) {

  }

  async ngOnInit() {

    await this.cartService.pushCartToQueue();
    this.cart$ = this.cartService.getCart();

  }
}
