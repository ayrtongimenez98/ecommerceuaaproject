import { Component, OnInit } from '@angular/core';
import { CouponService } from '../../shared/services/coupon.service';
import { CouponModel } from '../../models/coupon.model';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {

  coupons: Array<CouponModel> = [];
  loading:boolean = false;
  constructor(private readonly couponsService: CouponService) { }

  ngOnInit() {
    this.loading = true;
    this.couponsService.coupons().subscribe(x => {
      this.coupons = x;
      this.loading = false;
    });
  }

  delete = (id: string) => {
    this.loading = true;
    this.couponsService.delete(id).subscribe(x => {
      if (x.success){
        const index = this.coupons.findIndex(x => x.id === id);
        this.coupons.splice(index, 1);
        this.loading = false;
      }
    });
  };
}
