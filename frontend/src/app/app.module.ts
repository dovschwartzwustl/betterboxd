import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ProfileComponent } from './profile/profile.component';


@NgModule({
  declarations: [AppComponent],
  imports: [ BrowserModule, FormsModule, HeaderComponent, HomeComponent, UserLoginComponent, UserRegistrationComponent, ProfileComponent, AppRoutingModule, HttpClientModule],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
