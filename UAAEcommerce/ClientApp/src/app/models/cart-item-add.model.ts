import {ProductModel} from './product.model';


export interface ICartItemAddModel {
  product: ProductModel;
  quantity: number;
  forGift: boolean;
}
