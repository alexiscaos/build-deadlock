import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CommonService } from '../../../service/common.service';

@Component({
  selector: 'app-shop-vitality',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.vitality.template.html',
  styleUrl: './shop.vitality.style.css',
  standalone: true,
})
export class ShopVitality implements OnInit {
  @Input() allItems: any[] = [];
  private type: string = "vitality";
  public tierItemsMap: { [key: number]: any[] } = {};
  public isLoading: { [key: number]: boolean } = {};
  public items: any[] = [];
  public upgradeItems: any[] = [];
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
    this.isLoading[tier] = false;
    this.cdr.detectChanges();

  }

  public getUpgradeItems(item: any): any[] {
    console.log('Getting upgrade items for', item.name, item.component_items);
    this.upgradeItems = this.items.filter(i => {
      console.log(i); i.component_items.includes(i.class_name)
    });
    console.log('Upgrade items for', item.name, this.upgradeItems);
    return this.upgradeItems;
  }

  showItemInfo(item: any, event: MouseEvent) {
    this.hoveredItem = item;

    const offset = 20;
    this.cardPosition = {
      x: event.clientX + offset,
      y: event.clientY + offset
    };
  }

  hideItemInfo() {
    this.hoveredItem = null;
  }

}
