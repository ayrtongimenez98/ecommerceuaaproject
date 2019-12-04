import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ValidationService } from '../../shared/services/validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-category-upsert',
  templateUrl: './category-upsert.component.html',
  styleUrls: ['./category-upsert.component.css']
})
export class CategoryUpsertComponent implements OnInit {

  categoryId: string;
  categoryForm: FormGroup;
  process: boolean;

  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly categoryService: CategoryService) { }

  ngOnInit() {
    this.process = false;
    this.categoryForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
    });

    this.activatedRoute.params.subscribe(params => {
      this.categoryId = params["id"];
      if (this.categoryId != null) {
        this.categoryService.category(this.categoryId).subscribe(x => {
          this.categoryForm.patchValue({
            name: x.name
          });
        });
      }
    });
  }

  upsertCategory = () => {
    this.process = true;
    const name = this.categoryForm.get('name').value;
    const subCategoriesId = null;
    if (this.categoryId == null) {
      this.categoryService.createCategory(name, subCategoriesId).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/categories']);
      });
    } else {
      this.categoryService.updateCategory(this.categoryId, name).subscribe(x => {
        this.process = false;
        this.router.navigate(['/admin/categories']);
      });
    }
  };

  back = () => {
    this.router.navigate(["/admin/categories"]);
  };

  get cf() { return this.categoryForm.controls; }
}
