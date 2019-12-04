import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ProductModel } from 'src/app/models/product.model';
import {UserCartService} from "../../shared/services/user-cart.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: string;
  product: ProductModel = new ProductModel();
  banner: string;
  notBanner: string = '../../assets/images/carrusel/carrusel2.jpg';
  mainPhoto: string;
  loading: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService, private readonly userCartService: UserCartService) { }

  ngOnInit() {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      this.productId = params["id"];
      if (this.productId != null) {
        this.productService.product(this.productId).subscribe(x => {
          this.product = x;
          this.bannerUrl();
          this.mainPhotoURL();
          this.loading = false;
        });
      }
    });
  }

  bannerUrl (): string {
    if (this.product == null) return '';
    const photo = this.product.photos.find(p => p.banner);
    if (photo == null) return '';
    const image = photo.images.find(i => i.original);
    if (image == null) return '';
    this.banner = image.url;
  }

  mainPhotoURL(): string {
    if (this.product == null) return '';
    const photo = this.product.photos.find(p => p.main);
    if (photo == null) return '';
    const image = photo.images.find(i => i.original);
    if (image == null) return '';
    this.mainPhoto = image.url;
  }

  addProduct(){
    const items = this.userCartService.userCart.getValue();
    const cartItem = items.find(x => x.product.id == this.productId);
    if (cartItem == null)
      this.userCartService.addItem(this.product, 1);
    else
      this.userCartService.updateItem(this.productId, cartItem.quantity + 1)
  }

  // openModal = (product: ProductModel): void => {
  //   const items = this.userCartService.userCart.getValue();
  //   const cartItem = items.find(x => x.product.id == product.id);
  //   let quantity = 1;
  //   let forGift = false;
  //   if (cartItem != null) {
  //     quantity = cartItem.quantity;
  //     forGift = cartItem.forGift;
  //   }
  //   this.bottomSheetOpen(product, quantity, forGift);
  //   if (cartItem == null) {
  //     this.userCartService.addItem(product, 1);
  //   }
  // };

}


