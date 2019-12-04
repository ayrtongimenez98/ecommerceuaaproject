
export class CouponModel {
  id: string = null;
  code: string = null;
  description: string = null;
  status: string = "Pendiente";
  percentage: number = 0;
  orderId: string = null;
  expirationDate: string = ' ';
}
