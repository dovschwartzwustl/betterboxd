import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Movie } from './movie';
import { UserList } from './user-list';
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

    return this.http.post<any>(`${this.baseUrl}/follow/${userId}`, {}, { headers });
  }

  unfollowUser(userId: string): Observable<any> {
    const token = this.AuthService.getToken();
    if (!token) {
      throw new Error('No token available');
    }
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete<any>(`${this.baseUrl}/unfollow/${userId}`, { headers });
  }

  isFollowingUser(userId: string): Observable<boolean> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.AuthService.getToken()}`
    });
  
    return this.http.get<any>(`${this.baseUrl}/isFollowing/${userId}`, { headers }).pipe(
      map(response => response.isFollowing) // Extract the 'isFollowing' property from the response
    );
  }

  getUserFollowCounts(userId: string): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/${userId}/follow-counts`);
  }

  
  getFollowers(userId: string): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/followers/${userId}`).pipe(
      map(response => response.followers)
    );
  }

  
  getFollowing(userId: string): Observable<User[]> {
    return this.http.get<any>(`${this.baseUrl}/following/${userId}`).pipe(
      map(response => response.following)
    );
  }

  //Change
  getUserLists(userId: string): Observable<UserList[]> {
    return this.http.get<any>(`${this.baseUrl}/lists/${userId}`).pipe(
      map(response => response.lists)
    );
  }

  getListById(userId: string, listId: string): Observable<{ list: UserList, movies: Movie[] }> {
    return this.http.get<any>(`${this.baseUrl}/lists/${userId}/${listId}`).pipe(
      map(response => {
        const { list, movies } = response;
        return {
          list: {
            id: list.id,
            name: list.list_name
          },
          movies: movies
        };
      })
    );
  }

  createList(name: string, userId: string): Observable<any> {
    const newList = { name, user_id: userId };
    return this.http.post<any>(`${this.baseUrl}/lists`, newList);
  }


  addMoviesToList(listItems: any[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/list-items`, listItems);
  }
  
  

}
