import { Component } from '@angular/core';
import {ShopGun} from '../shop.gun/shop.gun.component';
import { ShopTech } from '../shop.tech/shop.tech.component'; 
import { ShopVitality } from '../shop.vitality/shop.vitality.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-explorer',
  imports: [CommonModule, ShopGun, ShopTech, ShopVitality],
  templateUrl: './shop.explorer.template.html',
  styleUrl: './shop.explorer.style.css',
  standalone: true,
})
export class ShopExplorerComponent {
  activeTab: string = 'shopExplorer';

  setActiveTab(tab: string):void{
    this.activeTab = tab;
  }
}
