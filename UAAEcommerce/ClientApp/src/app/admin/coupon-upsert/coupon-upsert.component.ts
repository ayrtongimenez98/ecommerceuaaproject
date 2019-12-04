import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponService } from '../../shared/services/coupon.service';
import { CouponModel } from '../../models/coupon.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { get } from 'selenium-webdriver/http';
import { ErrorStateMatcher } from '@angular/material/core';
@Component({
  selector: 'app-coupon-upsert',
  templateUrl: './coupon-upsert.component.html',
  styleUrls: ['./coupon-upsert.component.css']
})
export class CouponUpsertComponent implements OnInit {

  couponId: string = null;
  coupon: CouponModel;
  couponForm: FormGroup;

  loading: boolean = false;
  constructor(private readonly router: Router,
              private readonly couponService: CouponService) { }

  ngOnInit() {
    this.couponForm = new FormGroup({
      quantity: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      percentage: new FormControl("", [Validators.required]),
      expirationDate: new FormControl("", [Validators.required])
    });
  }

  createCoupons = () => {
    this.loading = true;
    const quantity = this.couponForm.get('quantity').value;
    const description = this.couponForm.get('description').value;
    const percentage = this.couponForm.get('percentage').value;
    const expirationDate = this.couponForm.get('expirationDate').value;

    this.couponService.generateCoupons(quantity, description, percentage, expirationDate).subscribe(x => {
      this.router.navigate(['/admin/coupons']);
    });
  };

  back = () => {
    this.router.navigate(["/admin/coupons"]);
  };

  get cf() { return this.couponForm.controls; }


}
