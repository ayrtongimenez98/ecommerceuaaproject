import { ProductModel } from './product.model';

export class CartItemModel {
  id: string;
  productId: string;
  product: ProductModel = new ProductModel();
  quantity: number = 0;
  forGift: boolean;
}
