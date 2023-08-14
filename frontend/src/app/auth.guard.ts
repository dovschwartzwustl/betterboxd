import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard {
  /*
  constructor(private authService: AuthService, private router: Router) {}

  canActivate = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
    if (route.data['requiresLogin']) {
      return this.authService.isLoggedIn$.pipe(
        map((isLoggedIn) => {
          if (!isLoggedIn) {
            return true;
          } else {
            return this.router.createUrlTree(['/']);
          }
        })
      );
    } else {
      
    }
  }
  */
}
