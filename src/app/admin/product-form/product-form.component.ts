import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/dto/category';
import { Product } from 'src/app/dto/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { take } from 'rxjs/operators';
import { lastValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {

  categories: Category[] | any;
  product: any = {};

  id: string | any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) {

    this.categories = [];
    categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    });

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {

      productService.get(this.id).pipe(take(1)).subscribe(product => this.product = product);

    }
  }

  async save(productForm: any) {

    const category = this.categories.find((category: Category) => {
      return category.id == productForm.category.id;
    });

    if (this.id) {

      await lastValueFrom(this.productService.update(this.product));
    }
    else {


      const product = { title: productForm.title, price: productForm.price, category: category, imageUrl: productForm.imageUrl };
      await lastValueFrom(this.productService.create(product));
    }
    this.router.navigate(['/admin/products']);
  }

  async delete() {

    if (!confirm("Do you want to delete"))
      return;
    await lastValueFrom(this.productService.delete(this.id));
    this.router.navigate(['/admin/products']);
  }
}
