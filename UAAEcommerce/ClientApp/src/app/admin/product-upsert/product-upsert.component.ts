import {Component, OnInit} from '@angular/core';
import {CategoryModel} from 'src/app/models/category.model';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/shared/services/user.service';
import {ProductService} from 'src/app/shared/services/product.service';
import {ValidationService} from 'src/app/shared/services/validation.service';
import {CategoryService} from 'src/app/shared/services/category.service';
import {forEach} from '@angular/router/src/utils/collection';
import {PhotoModel} from 'src/app/models/photo.model';
import {PhotoItemModel} from 'src/app/models/photoitem.model';
import {ProductModel} from 'src/app/models/product.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SubCategoryService} from "../../shared/services/sub-category.service";
import {SubCategoryModel} from "../../models/subcategory.model";

@Component({
  selector: 'app-product-upsert',
  templateUrl: './product-upsert.component.html',
  styleUrls: ['./product-upsert.component.css']
})
export class ProductUpsertComponent implements OnInit {

  productId: string;
  productForm: FormGroup;
  process: boolean;
  categories: Array<CategoryModel> = [];
  subCategories: Array<SubCategoryModel> = [];
  subCategorySelected: string = "0";
  product: ProductModel = new ProductModel();
  loading: boolean = false;
  isNitsuga: boolean = false;
  // itemsList: Item[] = ITEMS;

  private files: Array<File> = [];
  imagenes: Array<PhotoItemModel> = [];
  photosIds: Array<string> = [];
  main: number = 0;
  photosRemoved: Array<PhotoModel> = [];

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly productsService: ProductService,
              private readonly categoriesService: CategoryService, private readonly  subCategoriesService: SubCategoryService) {

    // this.getSelecteditem();
  }

  ngOnInit() {
    this.loading = true;
    this.process = false;
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.email], []),
      alcoholVol: new FormControl('', [Validators.required]),
      amargo: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      artist: new FormControl('',[Validators.required]),
      artistDesc: new FormControl('',[Validators.required]),
      subCategory: new FormControl('', [Validators.required])
    });

    this.categoriesService.categories().subscribe(x => {
      this.categories = x;
    });

    this.photosIds = [];
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
      if (this.productId != null) {
        this.productsService.product(this.productId).subscribe(x => {
          this.getSubCategoriesFromCategoryId(x.subCategory.categoryId);
          this.productForm.patchValue({
            name: x.name,
            description: x.description,
            category: x.subCategory.categoryId,
            subCategory: x.subCategory.id,
            price: x.price,
            alcoholVol: x.alcoholVol,
            amargo: x.amargor,
            color: x.color,
            artist: x.artist,
            artistDesc: x.artistDesc
          });
          for (let i = 0; x.photos.length > i; i++) {
            for (let j = 0; x.photos[i].images.length > j; j++) {
              this.imagenes.push(x.photos[i].images[j]);
            }
            this.photosIds.push(x.photos[i].id);
          }
          this.product = x;
          this.loading = false;
        });
      }else{
        this.isNitsuga = false;
        this.loading = false;
        this.updateValidators(amargo, alcoholVol, color, artistDesc,artist, this.isNitsuga)
      }

    });

    this.files = [];

    const alcoholVol = this.productForm.get('alcoholVol');
    const color = this.productForm.get('color');
    const amargo = this.productForm.get('amargo');
    const artist = this.productForm.get('artist');
    const artistDesc = this.productForm.get('artistDesc');

    this.productForm.get('category').valueChanges.subscribe(categoryId => {
      this.subCategoriesService.getSubCategoriesFromCategoryId(categoryId).subscribe(x => {
        let categorySelected = this.productForm.get('category');
        this.subCategories = x;
        this.productForm.get('subCategory').setValue('0');
        this.productForm.get('subCategory').setValue(this.product.subCategory.id);
        if(categorySelected.value === 'a3cb8f9f-4f1b-4bbf-a8de-b83bb87886c9'){
          this.isNitsuga = true;
          this.updateValidators(amargo, alcoholVol, color, artistDesc, artist, this.isNitsuga);
        }else{
          this.isNitsuga = false;
          this.updateValidators(amargo, alcoholVol, color, artistDesc, artist, this.isNitsuga);

        }
      });
    });


  }

  private updateValidators(amargo, alcoholVol, color, artistDesc, artist, isNitsuga) {
    if (isNitsuga){
      amargo.enable();
      alcoholVol.enable();
      color.enable();
      artistDesc.enable();
      artist.enable();
      this.productForm.get('artist').setValidators(Validators.required);
      this.productForm.get('artistDesc').setValidators(Validators.required);
      this.productForm.get('amargo').setValidators(Validators.required);
      this.productForm.get('alcoholVol').setValidators(Validators.required);
      this.productForm.get('color').setValidators(Validators.required);
    }else{
      amargo.disable();
      alcoholVol.disable();
      color.disable();
      artistDesc.disable();
      artist.disable();
      this.productForm.get('artist').clearValidators();
      this.productForm.get('artistDesc').clearValidators();
      this.productForm.get('amargo').clearValidators();
      this.productForm.get('alcoholVol').clearValidators();
      this.productForm.get('color').clearValidators();
    }
    this.productForm.get('artist').updateValueAndValidity();
    this.productForm.updateValueAndValidity();

  }

  getSubCategoriesFromCategoryId(id: string) {
    this.subCategoriesService.getSubCategoriesFromCategoryId(id).subscribe(x => {
      this.subCategories = x;
    });
  }

  onFilesDropped(files: File[]): void {
    console.log(files);
    this.files.push(...files);
  }

  upsertProduct = () => {
    this.process = true;
    const name = this.productForm.get('name').value;
    const description = this.productForm.get('description').value;
    const price = this.productForm.get('price').value;
    const alcoholVol = this.productForm.get('alcoholVol').value;
    const amargor = this.productForm.get('amargo').value;
    const color = this.productForm.get('color').value;
    const subCategoryId = this.productForm.get('subCategory').value;
    const artist = this.productForm.get('artist').value;
    const artistDesc = this.productForm.get('artistDesc').value;
    if (this.productId == null) {
      this.productsService.createProduct(name, description, price, alcoholVol, amargor, color, artist, artistDesc, subCategoryId, this.files).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/products']);
      });
    } else {
      this.productsService.updateProduct(this.productId, name, description,
        price, alcoholVol, amargor, color, artist, artistDesc, subCategoryId, this.photosIds, this.files).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/products']);
      });
    }
  };

  deletePhoto = (photo: PhotoModel, id: string) => {
    const i = this.product.photos.indexOf(photo);
    //this.product.photos.splice(i, 1);
    const j = this.photosIds.indexOf(photo.id);
    this.photosIds.splice(j, 1);
    const img = document.getElementById(id) as HTMLInputElement;
    const add = document.getElementById('add_' + id) as HTMLInputElement;
    const remove = document.getElementById('remove_' + id) as HTMLInputElement;
    add.style.display = 'block';
    remove.style.display = 'none';
    img.style.opacity = '0.3';
    this.photosRemoved.push(photo);
  };

  addPhoto = (photo: PhotoModel, id: string) => {
    this.photosIds.push(photo.id);
    const img = document.getElementById(id) as HTMLInputElement;
    const add = document.getElementById('add_' + id) as HTMLInputElement;
    const remove = document.getElementById('remove_' + id) as HTMLInputElement;
    add.style.display = 'none';
    remove.style.display = 'block';
    img.style.opacity = '1';
  };

  mainPhoto(id: string) {
    this.loading = true;
    this.productsService.mainPhoto(id).subscribe(x => {
      //this.ngOnInit();
      this.loading = false;
    });
  }

  bannerPhoto = (id: string) => {
    this.loading = true;
    this.productsService.bannerPhoto(id).subscribe(_ => {
      //this.ngOnInit();
      this.loading = false;
    })
  };

  back = () => {
    this.router.navigate(['/admin/products']);
  };

  get pf() {
    return this.productForm.controls;
  }
}
