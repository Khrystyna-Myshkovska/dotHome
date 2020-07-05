import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDistrictsComponent } from './admin-districts.component';

describe('AdminDistrictsComponent', () => {
  let component: AdminDistrictsComponent;
  let fixture: ComponentFixture<AdminDistrictsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDistrictsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
