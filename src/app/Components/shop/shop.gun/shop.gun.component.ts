import { ChangeDetectorRef, Component } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-shop-gun',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.gun.template.copy.html',
  styleUrl: './shop.gun.style.css',
  standalone: true,
})


export class ShopGun {
  private type: string = "weapon";
  public tierItemsMap: { [key: number]: any[] } = {};
  public isLoading: { [key: number]: boolean } = {};
  hoveredItem: any = null;
  cardPosition = { x: 0, y: 0 };
  constructor(
    private itemService: ItemService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    console.log("ShopGun inicializado");
    this.loadItemsForTier(1);
    this.loadItemsForTier(2);
    this.loadItemsForTier(3);
    this.loadItemsForTier(4);
  }

  public loadItemsForTier(tier: number) {
    this.isLoading[tier] = true;

    this.itemService.getItems(this.type, tier).subscribe({
      next: (response) => {

        if (!Array.isArray(response)) {
          console.error("Error: response no es un array");
          this.tierItemsMap[tier] = [];
          this.isLoading[tier] = false;
          return;
        }

        this.tierItemsMap[tier] = response
          .filter(item => item.item_tier === tier && item.shopable === true)
          .sort((a, b) => a.name.localeCompare(b.name));

        this.isLoading[tier] = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(`Error cargando items para tier ${tier}:`, error);
        this.tierItemsMap[tier] = [];
        this.isLoading[tier] = false;
        this.cdr.detectChanges();
      }
    });
  }

  showItemInfo(item:any, event: MouseEvent){
    this.hoveredItem = item;
        
        const offset = 20; 
        this.cardPosition = {
            x: event.clientX + offset,
            y: event.clientY + offset
        };
  }

  hideItemInfo(){
    this.hoveredItem = null;
  }

}