import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Item } from '../dto/item';
import { Product } from '../dto/product';
import { ShoppingCart } from '../dto/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product!: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {

    this.cartService.addToCart(this.product);
  }

}
