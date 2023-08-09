import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingComponent } from './following.component';

describe('FollowingComponent', () => {
  let component: FollowingComponent;
  let fixture: ComponentFixture<FollowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FollowingComponent]
    });
    fixture = TestBed.createComponent(FollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
