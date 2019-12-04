import {Injectable} from '@angular/core';
import {GraphQlService} from './graphql.service';
import {Observable} from 'rxjs';
import {ProductModel} from 'src/app/models/product.model';
import {map} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SystemValidationModel} from '../../models/systemvalidation.model';
import {CategoryModel} from "../../models/category.model";
import {SubCategoryModel} from "../../models/subcategory.model";
import {CartUpdateResponseModel} from "../../models/cart-update-response.model";
import {ProductUpdateResponseModel} from "../../models/product-update-response.model";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient, private readonly graphql: GraphQlService) {
  }

  products(): Observable<Array<ProductModel>> {
    const query = `{
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
        color
        amargor
        alcoholVol
        artist
        artistDesc
        photos {
          id
          name
          main
          banner
          images{
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
    }`;
    return this.graphql.query(query, null).pipe(map(x => x.data['products'] as Array<ProductModel>));
  }

  getShop(): Observable<any> {
    const query = `{
          categories {
              id
              name
            }
            subCategories {
              id
              categoryId
              name
            }
            products {
              id
              name
              description
              subCategory {
                id
                category {
                  id
                }
              }
              price
              photos {
                id
                main
                images {
                  original
                  url
                }
              }
            }
          }`;
    return this.graphql.query(query, null);
  }

  product(id: string): Observable<ProductModel> {
    const query =
      `query($id: ID!){
        product(id: $id) {
          id
          name
          description
          subCategory {
            id
            name
            categoryId
            category {
              name
            }
        }
          price
          alcoholVol
          color
          amargor
          artist
          artistDesc
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
      }`;
    return this.graphql.query(query, {id}).pipe(map(x => x.data['product'] as ProductModel));
  }

  createProduct = (name: string, description: string, price: string, alcoholVol: string, amargor: string,
                   color: string, artist: string, artistDesc: string, subCategoryId: string, photos?: File[]): Observable<{ id: string, dateCreated: Date }> => {
    const body = {
      name,
      description,
      subCategoryId,
      price,
      alcoholVol,
      amargor,
      color,
      artist,
      artistDesc
    };
    const formData = new FormData();
    formData.append('model', JSON.stringify(body));
    if (photos != null) {
      for (let i = 0; photos.length > i; i++) {
        formData.append(`file-${i}`, photos[i]);
      }
    }
    return this.http.post<{ id: string, dateCreated: Date }>('/api/products/create', formData,
      {headers: new HttpHeaders({'Authorization': `Bearer ${window.localStorage.getItem('token')}`})});
  };

  updateProduct = (id: string, name: string, description: string, price: string, alcoholVol: string, amargor: string,
                   color: string, artist: string, artistDesc: string, subCategoryId: string, photos: Array<string>, photo?: File[]): Observable<{ id: string, dateCreated: Date }> => {
    const body = {
      id,
      name,
      description,
      subCategoryId,
      price,
      alcoholVol,
      amargor,
      color,
      artist,
      artistDesc,
      photos
    };
    const formData = new FormData();
    formData.append('model', JSON.stringify(body));
    if (photo != null) {
      for (let i = 0; photo.length > i; i++) {
        formData.append(`file-${i}`, photo[i]);
      }
    }
    return this.http.post<{ id: string, dateCreated: Date }>('/api/products/update', formData,
      {headers: new HttpHeaders({'Authorization': `Bearer ${window.localStorage.getItem('token')}`})});
  };

  deleteProductById(productId: String): Observable<ProductUpdateResponseModel> {
    const query = `mutation($productId: String!){
                    deleteProductById(productId: $productId){
                      success
                    }
                  }`;
    return this.graphql.query(query, {productId}).pipe(map(x => x.data["deleteProductById"] as ProductUpdateResponseModel));
  }

  mainPhoto = (id: string): Observable<SystemValidationModel> => {
    const query = `mutation($id: ID!) {
                      mainPhoto(id: $id) {
                        success
                        message
                      }
                    }`;

    const variables = {
      'id': id
    };
    return this.graphql.query(query, variables).pipe(map(x => x.data['mainPhoto'] as SystemValidationModel));
  }

  bannerPhoto = (id: string): Observable<SystemValidationModel> => {
    const query = `mutation($id: ID!) {
                      bannerPhoto(id: $id) {
                        success
                        message
                      }
                    }`;
    const variables = {'id': id};
    return this.graphql.query(query, variables).pipe(map(x => x.data['bannerPhoto'] as SystemValidationModel));
  }
}
