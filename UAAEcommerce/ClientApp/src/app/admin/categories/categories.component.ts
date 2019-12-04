import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { CategoryModel } from '../../models/category.model';
import {SubCategoryModel} from "../../models/subcategory.model";
import {SubCategoryService} from "../../shared/services/sub-category.service";
import {MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})


export class CategoriesComponent implements OnInit {
  categories: Array<CategoryModel> = [];
  subCategories: Array<SubCategoryModel> = [];
  loadingCategories: boolean = false;
  loadingSubCategories: boolean = false;
  constructor(private readonly categoryService: CategoryService,
              private readonly subCategoryService: SubCategoryService,
              private readonly snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadingSubCategories = true;
    this.loadingCategories = true;
    this.categoryService.categories().subscribe(x => {
      this.categories = x;
      this.loadingCategories = false;
    });
    this.subCategoryService.subCategories().subscribe(subCate => {
      this.subCategories = subCate;
      this.loadingSubCategories = false;
    });
  }
  deleteCategory(id: string) {
    this.loadingCategories = true;
    this.categoryService.deleteCategoryById(id).subscribe(x => {
      if (!x.success){
        this.snackBar.open(x.message);
      }else{
        const index = this.categories.findIndex(x => x.id === id);
        this.categories.splice(index, 1);
      }
      this.loadingCategories = false;
    })
  }
  deleteSubCategory(id: string) {
    this.loadingSubCategories = true;
    this.subCategoryService.deleteSubCategoryById(id).subscribe(x => {
      if (!x.success){
        this.snackBar.open(x.message);
      }else{
        const index = this.subCategories.findIndex(x => x.id === id);
        this.subCategories.splice(index, 1);
      }
      this.loadingSubCategories = false;
    })
  }
}
