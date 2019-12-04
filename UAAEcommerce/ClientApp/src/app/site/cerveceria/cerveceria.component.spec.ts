import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerveceriaComponent } from './cerveceria.component';

describe('CerveceriaComponent', () => {
  let component: CerveceriaComponent;
  let fixture: ComponentFixture<CerveceriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerveceriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerveceriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
