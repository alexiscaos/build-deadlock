import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopTech } from './shop.tech';

describe('ShopTech', () => {
  let component: ShopTech;
  let fixture: ComponentFixture<ShopTech>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopTech]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopTech);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
