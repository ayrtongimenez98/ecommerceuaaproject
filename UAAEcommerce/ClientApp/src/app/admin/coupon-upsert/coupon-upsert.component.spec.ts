import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponUpsertComponent } from './coupon-upsert.component';

describe('CouponUpsertComponent', () => {
  let component: CouponUpsertComponent;
  let fixture: ComponentFixture<CouponUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
