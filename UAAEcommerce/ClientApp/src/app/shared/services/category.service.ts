import {Injectable} from "@angular/core";
import {GraphQlService} from "./graphql.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {CategoryModel} from "src/app/models/category.model";
import {ProductUpdateResponseModel} from "../../models/product-update-response.model";
import {SystemValidationModel} from "../../models/systemvalidation.model";


@Injectable()
export class CategoryService {
  constructor(private readonly graphql: GraphQlService) {

  }

  categories(): Observable<Array<CategoryModel>> {
    const query = `{
      categories {
        id
        name
      }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["categories"] as Array<CategoryModel>));
  }

  productsByCategory(): Observable<Array<CategoryModel>> {
    const query = `{
          productsByCategory {
              name
              subCategories {
                name
                products {
                  id
                  name
                  description
                  subCategory {
                    name
                    category {
                      id
                      name
                    }
                  }
                  price
                  photos {
                    id
                    name
                    main
                    banner
                    images {
                      size
                      blobName
                      containerName
                      height
                      width
                      original
                      format
                      url
                    }
                  }
                }
              }
  }
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data["productsByCategory"] as Array<CategoryModel>));
  }

  category(id: string): Observable<CategoryModel> {
    const query = `query($id: ID!){
                            category(id: $id){
                                id
                                name
                            }
                        }`;
    return this.graphql.query(query, {id}).pipe(map(x => x.data['category'] as CategoryModel));
  }

  createCategory(name: string, subCategoriesId: Array<String>): Observable<CategoryModel> {
    const query = `mutation ($category: CategoryInputType!) {
  createCategory(category: $category) {
    name,
    subCategories {
      id
    }
  }
}`;
    const variables = {
      "category": {
        name,
        subCategoriesId
      }

    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["createCategory"] as CategoryModel));
  }

  updateCategory(id: string, name: string): Observable<CategoryModel> {
    const query = `mutation($id: ID!, $category: CategoryInputType!) {
                            updateCategory(id: $id, category: $category) {
                                id
                                name
                            }
                        }`;
    const variables = {
      id,
      "category": {
        name
      }
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data["updateCategory"] as CategoryModel));
  }

  deleteCategoryById(categoryId: String): Observable<SystemValidationModel> {
    const query = `mutation($categoryId: String!){
                    deleteCategoryById(categoryId: $categoryId){
                      success
                      message
                    }
                  }`;
    return this.graphql.query(query, {categoryId}).pipe(map(x => x.data["deleteCategoryById"] as SystemValidationModel));
  }

}
