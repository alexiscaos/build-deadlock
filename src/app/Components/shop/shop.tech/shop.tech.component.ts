import { ChangeDetectorRef, Component } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shop-tech',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.tech.template.html',
  styleUrl: './shop.tech.style.css',
  standalone: true,
})
export class ShopTech {
  private type: string = "spirit";
  public tierItemsMap: { [key: number]: any[] } = {};
  public isLoading: { [key: number]: boolean } = {};
  public items: any[] = [];
  public upgradeItems: any[] = [];
  hoveredItem: any = null;
  cardPosition = { x: 0, y: 0 };
  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log("ShopTech inicializado");
    this.getItems();
  }

  public getItems() {
    console.log("Cargando items de tipo tech...");

    this.itemService.getItemsByType(this.type).subscribe({
      next: (data: any[]) => {
        this.items = data;
        console.log("Items de tipo tech cargados", this.items);
        this.cdr.detectChanges();
        this.loadItemsForTier(1);
        this.loadItemsForTier(2);
        this.loadItemsForTier(3);
        this.loadItemsForTier(4);
      },
      error: (error) => {
        console.error("Error al cargar los items de tipo arma", error);
      }
    });

  }

  public loadItemsForTier(tier: number) {
    this.isLoading[tier] = true;
    this.tierItemsMap[tier] = this.itemService.loadItemsForTier(this.items, tier);
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
