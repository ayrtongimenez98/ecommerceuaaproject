import { CartItemModel } from "./cartItem.model";

export class CartModel { 
    IdPedido: number;
    IdCliente: number;
    Confirmado: boolean;
    Total: number;
    Detalles: Array<CartItemModel>;
}

export const DEFAULT_CART_MODEL: CartModel = {
    IdPedido: 0, 
    Confirmado: false,
    Detalles: [],
    IdCliente: 0,
    Total: 0
}