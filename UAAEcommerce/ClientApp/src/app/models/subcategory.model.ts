import {ProductModel} from "./product.model";
import {CategoryModel} from "./category.model";

export class SubCategoryModel {
  id: string;
  name: string;
  categoryId: string;
  category: CategoryModel = new CategoryModel();
  products: Array<ProductModel> = [];
}
