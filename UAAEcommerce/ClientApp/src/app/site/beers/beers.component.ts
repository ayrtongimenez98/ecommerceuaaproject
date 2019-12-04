import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../../shared/services/product.service";
import {ProductModel} from "../../models/product.model";

declare var $: any;

@Component({
  selector: 'app-beers',
  templateUrl: './beers.component.html',
  styleUrls: ['./beers.component.css']
})
export class BeersComponent implements OnInit, OnDestroy {
  // products: Array<ProductModel> = new Array<ProductModel>();
  nitsuga: Array<ProductModel> = [];
  shouldDoIt = true;
  private carusel: any;

  constructor(private readonly productServices: ProductService) {
  }

  ngOnInit() {
    this.productServices.products().subscribe(x => {
      this.nitsuga = x.filter(x => x.subCategory.category.name === "Nitsuga");
    });
  }

  ngOnDestroy(): void {
    if(this.carusel != null)
      this.carusel.flickity('destroy');
  }

  getBeerPhoto = (product: ProductModel): string => {
    let url = "";
    let bannerPhoto = product.photos.find(x => !x.main && !x.banner);
    if (!bannerPhoto) {
      return "";
    }
    let image = bannerPhoto.images[0];
    if (!image) {
      return "";
    }
    if (bannerPhoto.images != null && bannerPhoto.images.length > 0) {
      url = bannerPhoto.images[0].url;
    }
    return url;
  };

  executeCss() {
    if (this.shouldDoIt){
      this.carusel = $('.grid-beers-large').flickity({
        cellSelector: ".beer-link",
        initialIndex: 3,
        freeScroll: true,
        wrapAround: true,
        pageDots: false,
        autoPlay: true
      });
      this.shouldDoIt = false;
    }
  }
}
