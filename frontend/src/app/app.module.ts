import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserSearchInputComponent } from './user-search-input/user-search-input.component';
import { UserSearchResultsComponent } from './user-search-results/user-search-results.component';
import { UserComponent } from './user/user.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserListComponent } from './user-list/user-list.component';
import { ListCreationComponent } from './list-creation/list-creation.component';
import { ListEditComponent } from './list-edit/list-edit.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [AppComponent],
  imports: [ BrowserModule, FormsModule, HeaderComponent, FooterComponent, HomeComponent, UserLoginComponent, UserRegistrationComponent, ProfileComponent, SearchInputComponent, SearchResultsComponent, UserSearchInputComponent, UserSearchResultsComponent, UserComponent, FollowersComponent, FollowingComponent, UserListsComponent, UserListComponent, ListCreationComponent, ListEditComponent, DeleteConfirmationComponent, MatDialogModule, AppRoutingModule, HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["example.com"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),],
  
  bootstrap: [AppComponent]
})
export class AppModule {


  


 }
