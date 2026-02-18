import { Component, OnInit } from '@angular/core';
import { ShopCategory } from '../shop.category/shop.category'; 
import { CommonModule } from '@angular/common';
import { ItemService } from '../../../service/shop.service/items.service';
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
    console.log("ItemSlotType enum values:", this.itemSlotType);
    console.log(this.activeTab);
    this.itemSlotTypeArray = Object.keys(this.itemSlotType).map(key => ({
      key: key,
      value: this.itemSlotType[key as keyof typeof ItemSlotType]
    }));
  }

  public loadAllItems() {
    console.log("Cargando todos los items desde el explorer...");
    this.itemService.getAllItems().subscribe({
      next: (data: any[]) => {
        this.allItems = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error("Error al cargar todos los items", error);
        this.isLoading = false;
      }
    });
  }

  setActiveTab(tab: string):void{
    this.activeTab = tab;
  }
}
