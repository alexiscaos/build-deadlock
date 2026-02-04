import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCategory } from './shop.category';

describe('ShopCategory', () => {
  let component: ShopCategory;
  let fixture: ComponentFixture<ShopCategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopCategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
