import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopVitality } from './shop.vitality';

describe('ShopVitality', () => {
  let component: ShopVitality;
  let fixture: ComponentFixture<ShopVitality>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopVitality]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopVitality);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
