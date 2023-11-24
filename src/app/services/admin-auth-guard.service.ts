import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../dto/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService  {

  user: User | any;

  constructor(private authService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const userRoles = null;
    this.authService.currentUser?.subscribe(user => {
      this.user = user;
    })
    if (!this.user)
      return false;
    if (this.user.isAdmin())
      return true;
    return false;
  }
}
