import { AfterViewInit, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$ = this.authService.isLoggedIn$;
  userId: string | null = null;

  constructor(private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.token$.subscribe(token => {
      if (token) {
        console.log("found token");
        const decodedToken = this.authService.getDecodedToken(token);
        this.userId = decodedToken.userId;
      } else {
        console.log("no token");
        this.userId = null;
      }
    });
  }
  

  logout() {
    this.authService.logout();
  }
}






