import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { OrderDetailComponent } from '../order-detail/order-detail.component';
import { OrderService } from '../services/order.service';



@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders: any[] = [];
  dtOptions: ADTSettings = {};

  constructor(private orderService: OrderService, private render: Renderer2, private router: Router, @Inject(LOCALE_ID) private locale: string, private modalService: NgbModal) {

    let token = localStorage.getItem('token') as string;
    const userId = new JwtHelperService().decodeToken(token).id;
    this.dtOptions = {

      ajax: async (dataTablesParameters: any, callback) => {
        this.orderService.getOrderByUser(userId).subscribe(orders => {
          this.orders = orders;
          callback({
            data: orders
          })
        })
      },
      columns: [
        {
          title: 'Order No.',
          data: 'id'
        },
        {
          title: 'Date',
          data: 'datePlaced',
          // ngPipeInstance: this.datePipe,
          render: function (data: any) {

            return formatDate(data, 'yyyy-MM-dd-HH:MM', locale);
          }
        },
        {
          title: 'Action',
          data: 'id',
          render: function (data: any, type: any, full: any) {
            return '<button class="btn btn-primary" view-id="' + data + '">View</button> <button class="btn btn-danger" delete-id="' + data + '">Delete</button>';
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

      if (event.target.hasAttribute('delete-id')) {
        let orderId = event.target.getAttribute("delete-id");
        this.open(orderId);
      }

    });
  }

  open(orderId: string) {
    this.modalService.open(DeleteModalComponent).result.then((result) => {

      if ('Delete' === result) {
        this.delete(orderId);
      }
    });
  }

  delete(orderId: string) {
    this.orderService.delete(orderId);
    window.location.reload();
  }
}
