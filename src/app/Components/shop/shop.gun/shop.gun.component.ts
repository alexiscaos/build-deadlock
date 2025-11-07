import { Component } from '@angular/core';
import { ItemService } from '../../../service/shop.service/items.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Importa el modulo HTTP

@Component({
  selector: 'app-shop-gun',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './shop.gun.template.copy.html',
  styleUrl: './shop.gun.style.css',
  standalone: true,
})

export class ShopGun {
  private type: string = "weapon";
  // public tier: number = 0;
  public tierItems: any[] = [];

  public tierItemsMap: { [key: number]: any[] } = {};

  constructor(private itemService: ItemService) { }


  loadItemsForTier(tier: number) {
    this.itemService.getItems(this.type, tier).subscribe({
      next: (response) => {
        const items = response.data;
        console.log("T I P O :"+typeof(response.data));
        if (!Array.isArray(items)) {
          console.error("Error: response.data no es un array");
          return;
        }
        this.tierItemsMap[tier] = items
          .filter(item => item.item_tier === tier && item.shopable === true)
          .sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  ngOnInit() {
    this.loadItemsForTier(1);
    this.loadItemsForTier(2);
    this.loadItemsForTier(3);
    this.loadItemsForTier(4);
  }

}
