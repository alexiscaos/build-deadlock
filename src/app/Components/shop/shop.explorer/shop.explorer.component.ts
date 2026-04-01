import { Component, OnInit } from '@angular/core';
import { ShopCategory } from '../shop.category/shop.category.component'; 
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../service/shop/items.service';
import {ItemSlotType} from './ItemSlotType.enum';

@Component({
  selector: 'app-shop-explorer',
  imports: [CommonModule,ShopCategory],
  templateUrl: './shop.explorer.template.html',
  styleUrl: './shop.explorer.style.css',
  standalone: true,
})
export class ShopExplorerComponent implements OnInit {
  activeTab: string = 'shopExplorer';
  public allItems: any[] = [];
  public isLoading: boolean = true;
  public itemSlotType = ItemSlotType;
  public itemSlotTypeArray: any[] = [];
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.loadAllItems();
    this.itemSlotTypeArray = Object.keys(this.itemSlotType).map(key => ({
      key: key,
      value: this.itemSlotType[key as keyof typeof ItemSlotType]
    }));
  }

  public loadAllItems() {
    this.itemService.getShopItems().subscribe({
      next: (data: any[]) => {
        this.allItems = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: string):void{
    this.activeTab = tab;
  }
}
