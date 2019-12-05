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
  products: Array<any> = [];
  shouldDoIt = true;
  private carusel: any;

  constructor(private readonly productServices: ProductService) {
  }

  ngOnInit() {
    this.productServices.findAll().subscribe(x => {
      this.products = x;
    });
  }

  ngOnDestroy(): void {
    if(this.carusel != null)
      this.carusel.flickity('destroy');
  }

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
