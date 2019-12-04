import {OrderDetailsItemModel} from "./order-details-item.model";

export class OrderDetailsModel {

  orderId: string;
  hash: string;
  cancelado: boolean;
  pagado: boolean;
  status: string;
  fechaPago: string;
  metodoPago: string;
  fechaMaximoPago: string;
  numeroPedido: string;
  deliveryMethod: 'TAKEOUT' | 'DELIVERY';
  items: Array<OrderDetailsItemModel> = [];

}
