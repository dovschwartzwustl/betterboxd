import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { AuthGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserSearchResultsComponent } from './user-search-results/user-search-results.component';
import { FollowersComponent } from './followers/followers.component';
import { FollowingComponent } from './following/following.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Home"},
  { path: 'login', component: UserLoginComponent, title: "Login", canActivate: [AuthGuard]},
  { path: 'register', component: UserRegistrationComponent, title: "Register", canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, title: "Profile"},
  { path: 'profile/:userId', component: ProfileComponent, title: "Profile"},
  { path: 'search/:query', component: SearchResultsComponent, title: "Search Results"},
  { path: 'usersearch/:query', component: UserSearchResultsComponent, title: "User Search Results"},
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'followers/:userId', component: FollowersComponent, title: "Followers" },
  { path: 'following/:userId', component: FollowingComponent, title: "Following" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
