import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApartmentsComponent } from './admin-apartments.component';

describe('AdminApartmentsComponent', () => {
  let component: AdminApartmentsComponent;
  let fixture: ComponentFixture<AdminApartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
