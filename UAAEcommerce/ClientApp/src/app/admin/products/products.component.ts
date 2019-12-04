import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../shared/services/product.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Array<ProductModel> = [];
  loading: boolean = false;
  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    this.loading = true;
    this.productService.products().subscribe(x => {
      this.products = x;
      this.loading = false;
    });
  }

  deleteProduct(id: string) {
    this.loading = true;
    this.productService.deleteProductById(id).subscribe(x => {
      if (!x.success) return;
      const index = this.products.findIndex(x => x.id === id);
      this.products.splice(index, 1);
      this.loading = false;
    })
  }
}
