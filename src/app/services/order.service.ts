import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, map, Observable, switchMap } from 'rxjs';
import { Order } from '../dto/order';
import { environment } from '../../environments/environment';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderServiceUrl: string = environment.orderServiceUrl;
  private alipayEndpoint: string = environment.alipayEndpoint;

  constructor(private http: HttpClient, private cartService: ShoppingCartService) { }

  async placeOrder(order: any) {

    let result = await lastValueFrom(this.http.post<any>(this.orderServiceUrl + '/orders/', order));
    this.cartService.clearCart();
    return result;
  }

  pay(orderId: any) {
    // will get a string which contains a html form, use this html to render payment provider's page
    return this.http.post<any>(this.orderServiceUrl + this.alipayEndpoint, orderId);
  }

  getOrderByUser(userId: string): Observable<Order[]> {

    return this.http.get<Order[]>(this.orderServiceUrl + '/orders/' + userId);
  }

  getOrderById(orderId: string): Observable<Order> {

    return this.http.get<Order>(this.orderServiceUrl + '/orders/order/' + orderId);
  }

  getAllOrders(): Observable<Order[]> {

    return this.http.get<Order[]>(this.orderServiceUrl + '/orders/');
  }

  delete(orderId: string) {
    this.http.delete(this.orderServiceUrl + '/orders/' + orderId).subscribe();
  }
}
