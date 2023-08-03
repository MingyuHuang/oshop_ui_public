import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client, Stomp, StompSubscription } from '@stomp/stompjs';
import { Observable, Subscription, switchMap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Category } from '../dto/category';
import { Product } from '../dto/product';
import { ShoppingCart } from '../dto/shopping-cart';
import { AuthenticationService } from '../services/authentication.service';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string | any;
  cart$!: Observable<ShoppingCart>;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: ShoppingCartService, private authService: AuthenticationService) {

  }

  async ngOnInit() {
    await this.cartService.pushCartToQueue();
    this.cart$ = this.cartService.getCart();
    this.populateProducts()
  }

  private populateProducts() {
    this.productService.getAll().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })).subscribe(params => {

      this.category = params.get('category');
      this.applyFilter();
    }, error => {

      if (error.error.httpStatus === 4011) {
        this.authService.logout();
      }
    });
  }

  private applyFilter() {

    this.filteredProducts = (this.category) ? this.products.filter(product => product.category.name === this.category) : this.products;
  }

}
