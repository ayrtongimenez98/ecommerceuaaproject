import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryUpsertComponent } from './subcategory-upsert.component';

describe('SubcategoryUpsertComponent', () => {
  let component: SubcategoryUpsertComponent;
  let fixture: ComponentFixture<SubcategoryUpsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubcategoryUpsertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
