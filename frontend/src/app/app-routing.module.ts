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
import { MoviesComponent } from './movies/movies.component';
import { UserListsComponent } from './user-lists/user-lists.component';
import { UserListMoviesComponent } from './user-list-movies/user-list-movies.component';
import { ListCreationComponent } from './list-creation/list-creation.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: "Home"},
  { path: 'login', component: UserLoginComponent, title: 'Login'},
  { path: 'register', component: UserRegistrationComponent, title: 'Register' },
  { path: 'profile', component: ProfileComponent, title: "Profile"},
  { path: 'search/:query', component: SearchResultsComponent, title: "Search Results"},
  { path: 'usersearch/:query', component: UserSearchResultsComponent, title: "User Search Results"},
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: 'profile/:userId', component: ProfileComponent,
    children: [
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
      { path: 'followers', component: FollowersComponent, title: "Follwers"},
      { path: 'following', component: FollowingComponent, title: "Following" },
      { path: 'movies', component: MoviesComponent, data: { source: 'watched' }, title: "Watched Movies"},
      { path: 'lists', component: UserListsComponent, title: "Lists" },
      { path: 'lists/:listId', component: UserListMoviesComponent, data: { source: 'list' } }
    ]
  },
  {path: 'create-list', component: ListCreationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
