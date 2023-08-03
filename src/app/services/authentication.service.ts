import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { User } from '../dto/user';
import { catchError, Observable, Subject, throwError } from 'rxjs';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private tokenKey = 'token';

  private authorizeEndpoint = '/oauth2/authorization/github';
  private tokenEndpoint = '/login/oauth2/code/github';
  private subject: Subject<User>;
  private headers: HttpHeaders;
  private token: string | any;
  private userServiceUrl: string = environment.userServiceUrl;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.subject = new Subject<User>();
    this.token = localStorage.getItem(this.tokenKey);
    this.headers = this.headers = new HttpHeaders().set('Authorizaztion', 'Bearer ' + this.token);
  }

  oauth2Login() {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    window.open(this.userServiceUrl + this.authorizeEndpoint, '_self');
  }

  // userNameCredentialsLogin(loginForm: any) {

  //   let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
  //   localStorage.setItem('returnUrl', returnUrl);
  //   this.httpClient.post<any>(this.userServiceUrl + '/users/authenticate', {
  //     userName: loginForm.email,
  //     credentials: loginForm.password
  //   }).subscribe(response => {
  //     if (response) {

  //       localStorage.setItem(this.tokenKey, response.token);
  //       this.router.navigate([returnUrl]);
  //     } else {
  //       alert('Username or password is not correct');
  //     }
  //   });

  // }

  userNameCredentialsLogin(loginForm: any) {

    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.httpClient.post<any>(this.userServiceUrl + '/login?username=' + loginForm.email + '&password=' + loginForm.password, {})
      .pipe(catchError(this.handleError))
      .subscribe(response => {
        console.log(response);
        if (response) {

          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigate([returnUrl]).then(() => {
            window.location.reload();
          });
        }
      });

  }

  private handleError(errorResponse: HttpErrorResponse) {


    let message = errorResponse.error.message;

    return throwError(() => {
      alert(message);
      return new Error(message)
    });
  }

  register(registerForm: any) {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.httpClient.post<any>(this.userServiceUrl + '/users/register', registerForm).subscribe(response => {
      if (response) {

        localStorage.setItem(this.tokenKey, response.token);
        this.router.navigate([returnUrl]).then(() => {
          window.location.reload();
        });
      } else {
        alert('User has already existed');
      }
    });

  }

  logout() {

    let token = localStorage.getItem(this.tokenKey);
    localStorage.removeItem(this.tokenKey);
    let returnUrl = localStorage.getItem('returnUrl') as string;
    this.httpClient.get(environment.userServiceUrl + '/users/logout/' + token)
      .pipe(catchError(this.handleError))
      .subscribe(response => {

        this.router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      });

  }

  updateToken(token: string) {

    localStorage.setItem(this.tokenKey, token);
  }

  fetchToken(code: string, state: string): Observable<any> {

    return this.httpClient.get(this.userServiceUrl + this.tokenEndpoint + '?code=' + code + '&state=' + state);
  }

  getToken() {

    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {

    const token = this.getToken();
    return token !== null;
  }

  get currentUser(): Observable<User> {

    const token = localStorage.getItem('token') as string;

    if (token) {

      const authenticatedUser = new JwtHelperService().decodeToken(token);
      this.httpClient.get(this.userServiceUrl + '/users/' + authenticatedUser.id, { 'headers': this.headers }).subscribe(user => {

        this.subject.next(new User(user));
      })
    } else {

      this.subject.error('Token is empty');
    }
    return this.subject.asObservable();

    // const token = localStorage.getItem('token') as string;
    // if (!token)
    //   return null;
    // const authenticatedUser = new JwtHelperService().decodeToken(token);
    // return new User(authenticatedUser.name, '', token, authenticatedUser.roles);

  }
}
