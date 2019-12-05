import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {UserCartService} from "../../shared/services/user-cart.service";
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: number;
  product: any = {Photo: '', Descripcion: '', Id: 0, Precio: 0, TipoProducto: ''};
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
        this.productService.findOne(this.productId).subscribe(x => {
          this.product = x;
          this.loading = false;
        });
      }
    });
  }

  bannerUrl (): string {
    if (this.product == null) return '';
    const photo = this.product.Photo;
    if (photo == null) return '';
    const image = photo.images.find(i => i.original);
    if (image == null) return '';
    this.banner = image.url;
  }


  addProduct(){
    const cart = this.userCartService.userCart.getValue();
    const cartItem = cart.Detalles.find(x => x.IdProducto == this.productId);
    if (cartItem == null)
      this.userCartService.addItem(this.productId, 1);
    else
      this.userCartService.updateItem(this.productId, cartItem.Cantidad + 1)
  }

  openModal = (product: any): void => {
    const cart = this.userCartService.userCart.getValue();
    const cartItem = cart.Detalles.find(x => x.IdProducto == product.id);
    let quantity = 1;
    let forGift = false;
    if (cartItem != null) {
      quantity = cartItem.Cantidad;
    }
    if (cartItem == null) {
      this.userCartService.addItem(product, 1);
    }
  };

}


