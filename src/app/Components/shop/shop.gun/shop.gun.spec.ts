import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGun } from './shop.gun.component';

describe('ShopGun', () => {
  let component: ShopGun;
  let fixture: ComponentFixture<ShopGun>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopGun]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopGun);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
