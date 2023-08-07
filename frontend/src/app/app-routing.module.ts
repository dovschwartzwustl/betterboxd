import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Home"},
  { path: 'login', component: UserLoginComponent, title: "Login", canActivate: [AuthGuard]},
  { path: 'register', component: UserRegistrationComponent, title: "Register", canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, title: "Profile"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
