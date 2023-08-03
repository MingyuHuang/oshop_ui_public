import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/dto/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  @Input('category') category: string | any;
  categories$: Observable<Category[]>;
  constructor(private categoryService: CategoryService) {

    this.categories$ = categoryService.getAll();
  }
}
