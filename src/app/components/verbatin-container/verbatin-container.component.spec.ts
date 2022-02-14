import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerbatinContainerComponent } from './verbatin-container.component';

describe('VerbatinContainerComponent', () => {
  let component: VerbatinContainerComponent;
  let fixture: ComponentFixture<VerbatinContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerbatinContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerbatinContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
