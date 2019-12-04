import { PhotoModel } from "./photo.model";
import {SubCategoryModel} from './subcategory.model';

export class ProductModel {
  id: string;
  name: string;
  description: string;
  subCategory: SubCategoryModel = new SubCategoryModel();
  photos: Array<PhotoModel> = [];
  subCategoryId: string;
  price: number = 0;
  alcoholVol: string;
  color: string;
  amargor: string;
  artist: string;
  artistDesc: string;
}
