import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/search/${query}`).pipe(
      map(response => response.results) // Parse the 'results' array from the API response
    );
  }

  getUsernameFromId(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/username`;
    return this.http.get<any>(url);
  }
}
