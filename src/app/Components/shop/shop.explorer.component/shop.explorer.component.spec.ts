import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopExplorerComponent } from './shop.explorer.component';

describe('ShopExplorerComponent', () => {
  let component: ShopExplorerComponent;
  let fixture: ComponentFixture<ShopExplorerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopExplorerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
