import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListModalComponent } from './movie-list-modal.component';

describe('MovieListModalComponent', () => {
  let component: MovieListModalComponent;
  let fixture: ComponentFixture<MovieListModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MovieListModalComponent]
    });
    fixture = TestBed.createComponent(MovieListModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
