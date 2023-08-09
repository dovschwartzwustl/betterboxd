import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSearchInputComponent } from './user-search-input.component';

describe('UserSearchInputComponent', () => {
  let component: UserSearchInputComponent;
  let fixture: ComponentFixture<UserSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserSearchInputComponent]
    });
    fixture = TestBed.createComponent(UserSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
