import { ProductModel } from "./product.model";
import { PhotoItemModel } from "./photoitem.model";

export class PhotoModel {
  id: string;
  productId: string;
  product: ProductModel = new ProductModel();
  name: string;
  images: Array<PhotoItemModel> = [];
  main: boolean;
  banner: boolean;
}
