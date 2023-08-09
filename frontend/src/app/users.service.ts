import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  searchUsers(query: string): Observable<any> {
    const params = { query };
    return this.http.get<any>(`${this.baseUrl}/search`, { params });
  }
}
