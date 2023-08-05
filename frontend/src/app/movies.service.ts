import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class MovieService {
    
    private baseUrl = 'http://localhost:3000/api/movies';

    constructor(private http: HttpClient) {}
        
        getMovies(): Observable<any[]> {
        return this.http.get<any[]>(this.baseUrl);
        
    }
    

}


