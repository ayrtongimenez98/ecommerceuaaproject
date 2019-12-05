import { ProductModel } from './product.model';

export class CartItemModel {
  IdPedidoDetalle: number;
  IdPedido: number;
  IdProducto: number;
  Cantidad: number = 0;
  Descripcion: string;
  SubTotal: number;
  Photo: string;
  Precio: number;
}
