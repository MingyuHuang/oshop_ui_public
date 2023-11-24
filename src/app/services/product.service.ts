import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Product } from '../dto/product';
import { environment } from '../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private token: string | any;
  private headers: HttpHeaders | any;
  private productServiceUrl: string = environment.productServiceUrl;

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) {
    this.token = localStorage.getItem('token');
    this.headers = new HttpHeaders().set('Authorizaztion', 'Bearer ' + this.token);
  }

  create(product: any): Observable<Product> {


    return this.httpClient.post<Product>(this.productServiceUrl + "/products", product, { 'headers': this.headers });
  }

  getAll(): Observable<Product[]> {

    return this.httpClient.get<Product[]>(this.productServiceUrl + "/products", { 'headers': this.headers }).pipe(catchError(this.handleError));
  }

  get(productId: string): Observable<Product> {

    return this.httpClient.get<Product>(this.productServiceUrl + "/products/" + productId, { 'headers': this.headers });
  }

  update(product: any): Observable<Product> {

    return this.httpClient.put<Product>(this.productServiceUrl + "/products", product, { 'headers': this.headers });
  }

  delete(productId: string): Observable<Object> {

    return this.httpClient.delete<Object>(this.productServiceUrl + "/products/" + productId, { 'headers': this.headers });
  }



  public handleError(errorResponse: HttpErrorResponse) {

    let message = '';
    if (errorResponse.status === 401)
      message = errorResponse.error.message;


    return throwError(() => {
      alert(message);

      return errorResponse;
    });
  }
}
