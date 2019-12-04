import {SubCategoryModel} from "./subcategory.model";
import {CartItemModel} from "./cartItem.model";

export class CategoryModel {
  id: string = null;
  name: string = null;
  subCategory: Array<SubCategoryModel> = [];
}
