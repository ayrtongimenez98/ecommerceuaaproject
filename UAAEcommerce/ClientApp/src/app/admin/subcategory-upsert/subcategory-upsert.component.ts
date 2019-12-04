import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SubCategoryService} from "../../shared/services/sub-category.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-subcategory-upsert',
  templateUrl: './subcategory-upsert.component.html',
  styleUrls: ['./subcategory-upsert.component.css']
})
export class SubcategoryUpsertComponent implements OnInit {

  subCategoryId: string;
  subCategoryForm: FormGroup;
  process: boolean;
  categories: Array<CategoryModel> = [];
  categoryIdSelected: string;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly subCategoryService: SubCategoryService,
              private readonly categoryService: CategoryService) {
  }

  ngOnInit() {
    this.process = false;

    this.subCategoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      categoryName: new FormControl(["",[Validators.required]])
    });

    this.categoryService.categories().subscribe(x => {
      this.categories = x;
    });

    this.onCategorySelected("");

    this.activatedRoute.params.subscribe(params => {
      this.subCategoryId = params["id"];
      if (this.subCategoryId != null) {
        this.subCategoryService.subCategory(this.subCategoryId).subscribe(x => {
          this.categoryIdSelected = x.categoryId;
          this.subCategoryForm.patchValue({
            name: x.name
          })
        })
      }
    })
  }

  upsertSubCategory = () => {
    this.process = true;
    const name = this.subCategoryForm.get('name').value;
    const categoryId = this.categoryIdSelected;
    // const subCategoryId = this.subCategoryForm.get('subCategoryId').value;
    if (this.subCategoryId == null) {
      this.subCategoryService.createSubCategory(name, categoryId).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/categories']);
      });
    } else {
      this.subCategoryService.updateSubCategory(this.subCategoryId, name, categoryId).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/categories']);
      });
    }
  };

  onCategorySelected(val: any) {
    this.categoryIdSelected = val;
    this.subCategoryForm.get("categoryName").setValue(val, {
      onlySelf: true
    });
    console.log(this.subCategoryForm.get("categoryName").value);
  }

  back = () => {
    this.router.navigate(["/admin/categories"]);
  };

  get cf() {
    return this.subCategoryForm.controls;
  }
}
