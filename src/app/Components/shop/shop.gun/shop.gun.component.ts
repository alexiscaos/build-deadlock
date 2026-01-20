import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../../service/common.service';


@Component({
  selector: 'app-shop-gun',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.gun.template.copy.html',
  styleUrl: './shop.gun.style.css',
  standalone: true,
})


export class ShopGun implements OnInit {
  @Input() allItems: any[] = [];
  private type: string = "weapon";
  public tierItemsMap: { [key: number]: any[] } = {};
  public isLoading: { [key: number]: boolean } = {};
  public items: any[] = [];
  public upgradeToItems: any[] = [];
  public upgradeFromItems: any[] = [];

  public tooltipSections: any[] = [];
  public item: any = null;
  hoveredItem: any = null;
  cardPosition = { x: 0, y: 0 };
  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef,
    private commonService: CommonService
  ) { }
  ngOnInit() {
    console.log("ShopGun inicializado");
    if (this.allItems && this.allItems.length > 0) {
      this.getItems();
    } else {

    }
  }

  public getItems() {
    this.items = this.commonService.getItemsByType(this.allItems, this.type);
    this.cdr.detectChanges();
    this.loadItemsForTier(1);
    this.loadItemsForTier(2);
    this.loadItemsForTier(3);
    this.loadItemsForTier(4);

  }

  public loadItemsForTier(tier: number) {
    this.isLoading[tier] = true;
    this.tierItemsMap[tier] = this.commonService.loadItemsForTier(this.items, tier);
    // this.item = this.tierItemsMap[1][2];
    // this.tooltipSections = this.item.tooltip_sections;
    this.isLoading[tier] = false;
    this.cdr.detectChanges();


  }

  public getUpgradeToItems(item: any): any[] {
    if (!item || !item.class_name) return [];

    this.upgradeToItems = this.allItems.filter(i => {
      console.log('Checking item for upgrade:', i);
      return i.component_items &&
        Array.isArray(i.component_items) &&
        i.component_items.includes(item.class_name);
    });
    console.log('Found upgrade to item:', this.upgradeToItems);

    return this.upgradeToItems;
  }

  public getUpgradeFromItems(item: any): any[] {
    if (!item || !item.class_name) return [];
    if ("component_items" in item) {
      this.upgradeFromItems = item.component_items;

      for (let i = 0; i < this.upgradeFromItems.length; i++) {
        const className = this.upgradeFromItems[i];
        const foundItem = this.allItems.find(it => it.class_name === className);
        if (foundItem) {
          this.upgradeFromItems[i] = foundItem;
          console.log('Found upgrade from item:', foundItem);

        }
      }

      return this.upgradeFromItems;
    } else {
      return [];
    }
  }

  showItemInfo(item: any, event: MouseEvent) {
    this.getUpgradeToItems(item);
    this.getUpgradeFromItems(item);
    this.hoveredItem = item;
    this.tooltipSections = this.hoveredItem.tooltip_sections;
    const offset = 20;
    this.cardPosition = {
      x: event.clientX + offset,
      y: event.clientY + offset
    };
  }

  hideItemInfo() {
    this.hoveredItem = null;
    this.upgradeFromItems = [];
    this.upgradeToItems = [];
    this.tooltipSections = [];
    console.log(this.upgradeFromItems) ;
    console.log(this.upgradeToItems) ;
  }

}