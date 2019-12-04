import { Injectable } from "@angular/core";
import { GraphQlService } from "./graphql.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {SubCategoryModel} from "../../models/subcategory.model";
import {CategoryModel} from "../../models/category.model";
import {SystemValidationModel} from "../../models/systemvalidation.model";

@Injectable()
export class SubCategoryService {
  constructor(private readonly graphql: GraphQlService) {

  }

  subCategories(): Observable<Array<SubCategoryModel>> {
    const query = `{
      subCategories {
        id
        name
        category{
          name
        }
      }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["subCategories"] as Array<SubCategoryModel>));
  }

  subCategory(id: string): Observable<SubCategoryModel> {
    const query = `query($id: ID!){
                            subCategory(id: $id){
                                id
                                name
                                category{
                                  id
                                  name
                                }
                                categoryId
                            }
                        }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data['subCategory'] as SubCategoryModel));
  }

  createSubCategory(name: string, categoryId: string): Observable<SubCategoryModel> {
    const query = `mutation($subCategory: SubCategoryInputType!) {
                        createSubCategory(subCategory: $subCategory) {
                            id
                            name
                        }
                    }`;
    const variables = {
      "subCategory": {
        name,
        categoryId
      }
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["createSubCategory"] as SubCategoryModel));
  }

  updateSubCategory(id: string, name: string, categoryId: string): Observable<SubCategoryModel> {
    const query = `mutation($id: ID!, $subCategory: SubCategoryInputType!) {
                            updateSubCategory(id: $id, subCategory: $subCategory) {
                                id
                                name
                            }
                        }`;
    const variables = {
      id,
      "subCategory": {
        name,
        categoryId
      }
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["updateSubCategory"] as SubCategoryModel));
  }

  getSubCategoriesFromCategoryId(id: string): Observable<Array<SubCategoryModel>> {
    const query = `query($id: ID!){
                      getSubCategoriesFromCategoryId(id: $id){
                          id
                          name
                      }
                  }`;
    return this.graphql.query(query, { id }).pipe(map(x => x.data['getSubCategoriesFromCategoryId'] as Array<SubCategoryModel>));
  }
  deleteSubCategoryById(subCategoryId: String): Observable<SystemValidationModel> {
    const query = `mutation($subCategoryId: String!){
                    deleteSubCategoryById(subCategoryId: $subCategoryId){
                      success
                      message
                    }
                  }`;
    return this.graphql.query(query, {subCategoryId}).pipe(map(x => x.data["deleteSubCategoryById"] as SystemValidationModel));
  }
}
