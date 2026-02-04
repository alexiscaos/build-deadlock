import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-shop-category',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.category.html',
  styleUrl: './shop.category.css',
  standalone: true,
})
export class ShopCategory implements OnInit {
  @Input() allItems: any[] = [];
  @Input() type: string = "";
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

    const upgradeToItems = this.allItems.filter(i => {
      return i.component_items &&
        Array.isArray(i.component_items) &&
        i.component_items.includes(item.class_name);
    });

    return upgradeToItems;
  }

  public getUpgradeFromItems(item: any): any[] {
    if (!item || !item.class_name) return [];
    if ("component_items" in item) {
      const upgradeFromItems = item.component_items.map((className: string) => {
        const foundItem = this.allItems.find(it => it.class_name === className);
        if (foundItem) {
          return foundItem;
        }
        return null;
      }).filter((item: any) => item !== null);

      return upgradeFromItems;
    } else {
      return [];
    }
  }

  showItemInfo(item: any, event: MouseEvent) {
    this.upgradeToItems = this.getUpgradeToItems(item);
    this.upgradeFromItems = this.getUpgradeFromItems(item);
    this.hoveredItem = item;
    this.tooltipSections = this.hoveredItem.tooltip_sections;

    setTimeout(() => {
      const offset = 20;
      let x = event.clientX + offset;
      let y = event.clientY + offset;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const cardElement = document.querySelector('.item-card-tooltip') as HTMLElement;
      const cardWidth = cardElement?.offsetWidth || 400;
      const cardHeight = cardElement?.offsetHeight || 550;
      if (x + cardWidth > windowWidth) {
        x = event.clientX - cardWidth - offset;
      }
      if (y + cardHeight > windowHeight) {
        y = event.clientY - cardHeight - offset;
      }
      if (x < 0) x = offset;
      if (y < 0) y = offset;

      this.cardPosition = { x, y };
      this.cdr.detectChanges();
    }, 0);
  }


  hideItemInfo() {
    this.hoveredItem = null;
    this.upgradeFromItems = [];
    this.upgradeToItems = [];
    this.tooltipSections = [];
  }

  public get categoryThemeClass(): string {
    switch (this.type) {
      case 'weapon': return 'theme-weapon';
      case 'vitality': return 'theme-vitality';
      case 'spirit': return 'theme-spirit';
      default: return '';
    }
  }
}

