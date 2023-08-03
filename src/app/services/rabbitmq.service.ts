import { Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';
import { ShoppingCart } from '../dto/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class RabbitmqService {

  private subject: Subject<ShoppingCart>;

  constructor(private client: Client) {

    this.client = new Client();
    this.subject = new Subject<ShoppingCart>();
  }

  public connect(url: string): Observable<ShoppingCart> {

    this.client.configure({
      brokerURL: url,
      onConnect: (frame) => {
        this.client.subscribe('/queue/queue_products', message => {
          const cart = JSON.parse(message.body);
          const newCart = new ShoppingCart(cart['items']);
          this.subject.next(newCart);
        });
      }
    });
    this.client.activate();
    return this.subject.asObservable();
  }

  public disconnect() {

    this.client.deactivate();
  }
}
