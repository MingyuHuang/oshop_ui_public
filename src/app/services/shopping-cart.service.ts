import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { firstValueFrom, Observable, take } from 'rxjs';
import { Item } from '../dto/item';
import { Product } from '../dto/product';
import { ShoppingCart } from '../dto/shopping-cart';
import { environment } from '../../environments/environment';
import { RabbitmqService } from './rabbitmq.service';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private cartStream: Observable<ShoppingCart>;
  private orderServiceUrl: string = environment.orderServiceUrl;
  private rabbitmqUrl: string = environment.rabbitmqUrl;

  constructor(private http: HttpClient, private rabbitmqService: RabbitmqService) {

    this.cartStream = this.rabbitmqService.connect(this.rabbitmqUrl);
  }


  private createCart(): Promise<ShoppingCart> {

    return firstValueFrom(this.http.post<ShoppingCart>(this.orderServiceUrl + '/shopping-carts/', {
      createdDate: new Date().getTime()
    }));
  }

  public async pushCartToQueue() {

    let cartId = await this.getOrCreateCartId();
    this.http.get<ShoppingCart>(this.orderServiceUrl + '/shopping-carts/' + cartId).subscribe();
  }

  public getCart(): Observable<ShoppingCart> {

    return this.cartStream;
  }

  public async clearCart() {

    let cartId = await this.getOrCreateCartId();
    this.http.delete(this.orderServiceUrl + '/shopping-carts/' + cartId + '/items').subscribe();
  }

  public disconnect() {

    this.rabbitmqService.disconnect();
  }

  public getItem(cartId: string, productId: string) {

    return this.http.get<Item>(this.orderServiceUrl + '/shopping-carts/' + cartId + '/items/' + productId);
  }

  private updateItem(cartId: string, item: Item, product: Product, change: number): Observable<ShoppingCart> {

    return this.http.put<ShoppingCart>(this.orderServiceUrl + '/shopping-carts/' + cartId + '/items/' + product.id.toString(), {
      id: product.id,
      imageUrl: product.imageUrl,
      quantity: (item?.quantity | 0) + change,
      price: product.price,
      title: product.title
    });
  }

  public async getOrCreateCartId(): Promise<string> {

    let cardId = localStorage.getItem('cartId');

    if (cardId) {

      return cardId;
    }

    let newCartId = await this.createCart();
    localStorage.setItem('cartId', newCartId.id);
    return newCartId.id;

  }

  public addToCart(product: Product) {

    this.updateQuantity(product, 1);
  }

  public removeFromCart(product: Product) {

    this.updateQuantity(product, -1);
  }

  private async updateQuantity(product: Product, change: number) {

    let cartId = await this.getOrCreateCartId();

    let item$ = this.getItem(cartId, product.id.toString());

    item$.pipe(take(1)).subscribe(item => {

      this.updateItem(cartId, item, product, change).subscribe();
    })
    // let updatedCart = await lastValueFrom(this.updateItem(cart, item, product.id, change));

    // return updatedCart;
  }

}
