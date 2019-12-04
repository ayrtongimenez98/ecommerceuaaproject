import { UserModel } from "./user.model";

export class OrderModel {
  id:string=null;
  userId: string = null;
  user: UserModel = new UserModel();
  status: string;
  items: Array<any> = [];
  numeroPedido: string;
  date:string;
  hash:string;
  paymentMethod:string;
  deliverymethod:string;
  total:string;
  cantItems:String;
}
