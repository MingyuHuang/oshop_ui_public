import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, NotFoundError, Observable, throwError } from 'rxjs';
import { Category } from '../dto/category';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categoryEndpoint: string = '/products/categories';
  private token: string | any;
  private productServiceUrl: string = environment.productServiceUrl;

  constructor(private httpClient: HttpClient) {

    this.token = localStorage.getItem('token');
  }

  getAll(): Observable<Category[]> {

    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    return this.httpClient.get<Category[]>(this.productServiceUrl + this.categoryEndpoint, { 'headers': headers });
  }


}
