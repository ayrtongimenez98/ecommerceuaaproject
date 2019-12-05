import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material';
import {UserCartService} from '../../shared/services/user-cart.service';
import {CategoryModel} from "../../models/category.model";
import {SubCategoryModel} from "../../models/subcategory.model";
import {ProductService} from '../../shared/services/product.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  primary: string = '#54682A';
  products: Array<any> = [];
  loading: boolean = false;
  categories: Array<CategoryModel> = [];
  subCategories: Array<SubCategoryModel> = [];
  subCategoriesTab: any;
  categoryIdSelected: string;
  allProducts: Array<any> = [];

  constructor(private readonly productService: ProductService,
              private _bottomSheet: MatBottomSheet,
              private readonly userCartService: UserCartService) {
  }

  ngOnInit() {
    this.loading = true;
    this.productService.findAll().subscribe(x => {
      this.loading = false;
      this.allProducts = x;
      this.products = this.allProducts;

    })
  }

  openModal = (product: any): void => {
    const cart = this.userCartService.userCart.getValue();
    const cartItem = cart.Detalles.find(x => x.IdProducto == product.id);
    let quantity = 1;
    if (cartItem != null) {
      quantity = cartItem.Cantidad;
    }
    if (cartItem == null) {
       this.userCartService.addItem(product, 1);
    }
  };

  getSubCategories = (currentTarget: any) =>{
    this.categoryIdSelected = currentTarget.id;
    this.filterCategory(this.categoryIdSelected);
    this.subCategoriesTab = this.subCategories.filter(x=>x.categoryId == this.categoryIdSelected);
  };

  filterSubCategory = (currentTarget: any) => {
    this.categoryIdSelected = currentTarget.id;
    this.products = [];
    if (currentTarget.id == ""){
      this.products = this.allProducts;
    }else{

      this.products = this.allProducts.filter(x=> x.subCategory.id == currentTarget.id);
    }
  };

  filterCategory = (categoryId: string) =>{
    this.products = [];
    if (categoryId == ""){
      this.categoryIdSelected = null;
      this.products = this.allProducts;
    }else{
      this.products = this.allProducts.filter(x=> x.subCategory.category.id == categoryId);
    }
  };

}
