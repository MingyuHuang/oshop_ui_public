import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {

  orders: any[] = [];
  dtOptions: DataTables.Settings = {};


  constructor(private orderService: OrderService, private render: Renderer2, private router: Router, @Inject(LOCALE_ID) private locale: string) {

    let token = localStorage.getItem('token') as string;
    const userId = new JwtHelperService().decodeToken(token).id;
    this.dtOptions = {

      ajax: async (dataTablesParameters: any, callback) => {
        this.orderService.getAllOrders().subscribe(orders => {
          this.orders = orders;
          callback({
            data: orders
          })
        })
      },
      columns: [
        {
          title: 'Customer',
          data: 'shipping.name'
        },
        {
          title: 'Date',
          data: 'datePlaced',
          render: function (data: any) {

            return formatDate(data, 'yyyy-MM-dd-HH:MM', locale);
          }
        },
        {
          title: 'Action',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<button class="btn btn-primary" view-id="' + data + '">View</button>';
          }
        }]
    };
  }

  ngAfterViewInit(): void {
    this.render.listen('document', 'click', (event) => {

      if (event.target.hasAttribute("view-id")) {
        let orderId = event.target.getAttribute("view-id");
        this.router.navigate(["/my/orders/" + orderId]);
      }
    });
  }

}
