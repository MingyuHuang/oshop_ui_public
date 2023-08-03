import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subject, Subscription } from 'rxjs';
import { Product } from 'src/app/dto/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements AfterViewInit, OnInit {

  products: Product[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService, private render: Renderer2, private router: Router) {


  }
  ngOnInit(): void {


    this.dtOptions = {

      ajax: async (dataTablesParameters: any, callback) => {
        this.productService.getAll().subscribe(products => {
          callback({
            data: products
          })
        })
      },
      data: this.products,
      columns: [
        {
          title: 'Title',
          data: 'title'
        },
        {
          title: 'Price',
          data: 'price'
        },
        {
          title: 'Action',
          data: 'id',
          render: function (data: any, type: any, full: any) {

            return '<button class="btn btn-primary" edit-id="' + data + '">Edit</button>';
          }
        }]
    };
  }


  ngAfterViewInit(): void {
    this.render.listen('document', 'click', (event) => {

      if (event.target.hasAttribute("edit-id")) {
        this.router.navigate(["/admin/products/" + event.target.getAttribute("edit-id")]);
      }
    });
  }
}
