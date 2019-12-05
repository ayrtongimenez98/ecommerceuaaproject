import {ProductModel} from './product.model';


export interface ICartItemAddModel {
  idProducto: number;
  cantidad: number;
  idPedido: number;
  idCliente: number;
}
