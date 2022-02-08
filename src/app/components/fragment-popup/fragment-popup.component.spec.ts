import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FragmentPopupComponent } from './fragment-popup.component';

describe('FragmentPopupComponent', () => {
  let component: FragmentPopupComponent;
  let fixture: ComponentFixture<FragmentPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FragmentPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FragmentPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
