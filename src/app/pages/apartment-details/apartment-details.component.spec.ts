import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartmentDetailsComponent } from './apartment-details.component';

describe('ApartmentDetailsComponent', () => {
  let component: ApartmentDetailsComponent;
  let fixture: ComponentFixture<ApartmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApartmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
