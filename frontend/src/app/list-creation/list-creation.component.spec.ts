import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreationComponent } from './list-creation.component';

describe('ListCreationComponent', () => {
  let component: ListCreationComponent;
  let fixture: ComponentFixture<ListCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListCreationComponent]
    });
    fixture = TestBed.createComponent(ListCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
