import { Component, Input } from '@angular/core';
import { Item } from '../dto/item';
import { Product } from '../dto/product';
import { ShoppingCart } from '../dto/shopping-cart';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {

  }

  addToCart() {

    this.cartService.addToCart(this.product);
  }

  removeFromCart() {

    this.cartService.removeFromCart(this.product);
  }



}
