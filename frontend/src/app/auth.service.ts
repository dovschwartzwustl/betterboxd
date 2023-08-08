import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseLoginUrl = 'http://localhost:3000/api/login';
  private baseRegisterUrl = 'http://localhost:3000/api/register';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    const isLoggedIn = !!localStorage.getItem('authToken');
    this.isLoggedInSubject.next(isLoggedIn);
  }

  loginUser(username: string, password: string): Observable<any> {
    const user = { username, password };
    return this.http.post<any>(this.baseLoginUrl, user).pipe(
      tap(() => {
        // Update the login status to true after successful login
        this.isLoggedInSubject.next(true);
        
      })
    );
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseRegisterUrl, user).pipe(
      tap((response) => {
        const token = response.token;
        localStorage.setItem('authToken', token);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable().pipe(
      tap(loggedIn => {
        console.log('Logged in?', loggedIn);
      })
    );
  }

  getDecodedToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }

  getUserIdFromToken(): number {
    const token = localStorage.getItem('authToken');
    if (token) {
      
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log(decodedToken.userId)
      return decodedToken.userId;
    } 
    throw new Error("no user id")
  }
}
