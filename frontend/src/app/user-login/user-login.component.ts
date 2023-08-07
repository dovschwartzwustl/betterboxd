import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  private baseUrl = 'http://localhost:3000/api/login';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  

  loginUser() {
    const { username, password } = this.loginForm.value as { username: string, password: string };

    this.authService.loginUser(username, password).subscribe({
      next: (response) => {
        const token = response.token;
        // Save the token in local storage or a cookie for future API requests
        localStorage.setItem('authToken', token);
        this.router.navigate(['/']); // Navigate to the home screen (assuming '/' is the route for HomeComponent)
      },
      error: (error) => console.error('Error logging in:', error)
    });
  }
}






