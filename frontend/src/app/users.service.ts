import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private AuthService: AuthService) {}

  searchUsers(query: string): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/search/${query}`).pipe(
      map(response => response.results) // Parse the 'results' array from the API response
    );
  }

  getUsernameFromId(userId: string): Observable<any> {
    const url = `${this.baseUrl}/${userId}/username`;
    return this.http.get<any>(url);
  }

  followUser(userId: string): Observable<any> {
    const token = this.AuthService.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post<any>(`${this.baseUrl}/users/follow/${userId}`, {}, { headers });
  }

  unfollowUser(userId: string): Observable<any> {
    const token = this.AuthService.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete<any>(`${this.baseUrl}/users/unfollow/${userId}`, { headers });
  }

  isFollowingUser(userId: string): Observable<boolean> {
    return this.http.get<{ isFollowing: boolean }>(`${this.baseUrl}/isFollowing/${userId}`)
    .pipe(
      map(response => response.isFollowing)
    );
  }

}
