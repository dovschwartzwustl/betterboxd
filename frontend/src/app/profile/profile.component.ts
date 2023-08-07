import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userId: number | undefined;
  username: string | undefined;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get the token from local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Decode the token and parse the payload
      const decodedToken = this.authService.getDecodedToken(token);
      // Access the user's ID from the payload
      this.userId = decodedToken.userId;
      this.username = decodedToken.username;
    }
  }
}