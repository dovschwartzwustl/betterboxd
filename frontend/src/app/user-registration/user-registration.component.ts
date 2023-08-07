import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-user-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})


export class UserRegistrationComponent {
  registrationForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) {}

  registerUser() {
    const user = {
      username: this.registrationForm.value.username,
      password: this.registrationForm.value.password,
      confirmPassword: this.registrationForm.value.confirmPassword
    };

    this.authService.registerUser(user).subscribe({
      next: () => {
        alert('User registered successfully');
        // Redirect to the home page after successful registration
        this.router.navigate(['/']);
      },
      error: (error) => {
        if (error.status === 408) {
          alert("Passwords don't match");
        } else if (error.status === 409) {
          alert('Username already exists');
        } else {
          console.error('Error registering:', error);
          alert('Internal server error. Please try again later.');
        }
      }
    });
  }
}
