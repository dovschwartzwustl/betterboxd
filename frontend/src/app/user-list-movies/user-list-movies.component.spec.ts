import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMoviesComponent } from './user-list-movies.component';

describe('UserListMoviesComponent', () => {
  let component: UserListMoviesComponent;
  let fixture: ComponentFixture<UserListMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserListMoviesComponent]
    });
    fixture = TestBed.createComponent(UserListMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
