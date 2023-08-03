import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom, lastValueFrom, map, Observable, take } from 'rxjs';
import { Order } from '../dto/order';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { AuthenticationService } from '../services/authentication.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order$!: Observable<Order>;
  id: string | any;

  constructor(private router: Router, private authService: AuthenticationService, private orderService: OrderService, private route: ActivatedRoute, private modalService: NgbModal) {

  }
  async ngOnInit() {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {

      this.order$ = this.orderService.getOrderById(this.id).pipe(map(order => new Order(order)));
    }
  }

  open() {
    this.modalService.open(DeleteModalComponent, {
      ariaLabelledBy: 'deleteModalLabel'
    }).result.then((result) => {

      if (result === 'Delete') {
        this.delete();
      }
    });
  }

  async delete() {

    let user = await firstValueFrom(this.authService.currentUser);
    this.orderService.delete(this.id);

    if (!user.isAdmin()) {

      this.router.navigate(['my/orders']);
    } else {
      this.router.navigate(['admin/orders'])
    }
  }

}
