import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEditComponent } from './list-edit.component';

describe('ListEditComponent', () => {
  let component: ListEditComponent;
  let fixture: ComponentFixture<ListEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ListEditComponent]
    });
    fixture = TestBed.createComponent(ListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
