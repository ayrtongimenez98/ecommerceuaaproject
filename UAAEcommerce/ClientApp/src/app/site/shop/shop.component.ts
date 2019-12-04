import {Component, OnInit} from '@angular/core';
import {ProductModel} from 'src/app/models/product.model';
import {ProductService} from 'src/app/shared/services/product.service';
import {ItemModalComponent} from './item-modal/item-modal.component';
import {MatBottomSheet} from '@angular/material';
import {UserCartService} from '../../shared/services/user-cart.service';
import {CategoryModel} from "../../models/category.model";
import {SubCategoryModel} from "../../models/subcategory.model";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})

export class ShopComponent implements OnInit {
  primary: string = '#54682A';
  products: Array<ProductModel> = [];
  loading: boolean = false;
  categories: Array<CategoryModel> = [];
  subCategories: Array<SubCategoryModel> = [];
  subCategoriesTab: any;
  categoryIdSelected: string;
  allProducts: Array<ProductModel> = [];

  constructor(private readonly productService: ProductService,
              private _bottomSheet: MatBottomSheet,
              private readonly userCartService: UserCartService) {
  }

  ngOnInit() {
    this.loading = true;
    this.productService.getShop().subscribe(x => {
      this.loading = false;
      this.categories = x.data['categories'];
      this.subCategories = x.data['subCategories'];
      this.allProducts = x.data['products'];
      this.products = this.allProducts;

    })
  }

  openModal = (product: ProductModel): void => {
    const items = this.userCartService.userCart.getValue();
    const cartItem = items.find(x => x.product.id == product.id);
    let quantity = 1;
    let forGift = false;
    if (cartItem != null) {
      quantity = cartItem.quantity;
      forGift = cartItem.forGift;
    }
    this.bottomSheetOpen(product, quantity, forGift);
    if (cartItem == null) {
       this.userCartService.addItem(product, 1);
    }
  };

  getMainPhoto = (product: ProductModel): string => {
    let url = "";
    // console.log("entra en getMainPhoto");
    let mainPhoto = product.photos.find(x => x.main);
    if (!mainPhoto) {
      return "";
    }
    let image = mainPhoto.images[0];
    if (!image) {
      return "";
    }
    if (mainPhoto.images != null && mainPhoto.images.length > 0) {
      url = mainPhoto.images[0].url;
    }
    return url;
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

  private bottomSheetOpen(product: ProductModel, quantity: number, forGift: boolean): void {
    this._bottomSheet.open(ItemModalComponent, {
      data: {
        product,
        quantity,
        forGift
      },
    });
  }

}
