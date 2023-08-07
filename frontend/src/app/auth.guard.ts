import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.isLoggedIn$.pipe(
      map((isLoggedIn) => {
        // If the user is not logged in, allow access to login and register screens
        // If the user is logged in, redirect them to the home screen
        if (!isLoggedIn) {
          return true;
        } else {
          this.router.navigate(['/']); // Redirect to the home screen if logged in
          return false;
        }
      })
    );
  }
}
