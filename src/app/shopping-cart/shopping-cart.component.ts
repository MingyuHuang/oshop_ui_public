import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../dto/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$!: Observable<ShoppingCart>;


  constructor(private cartService: ShoppingCartService) {

  }

  async ngOnInit() {

    await this.cartService.pushCartToQueue();
    this.cart$ = this.cartService.getCart();
  }

  public clearCart() {

    this.cartService.clearCart();
  }

}
