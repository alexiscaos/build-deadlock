import { Component } from '@angular/core';

@Component({
  selector: 'shop-explorer',
  imports: [],
  templateUrl: './shop.explorer.template.html',
  styleUrl: './shop.explorer.style.css',
})
export class ShopExplorerComponent {
  alerta() {
    alert("shop.explorer.component works!");
  }
}
