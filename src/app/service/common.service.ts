import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    public items: any[] = [];

    constructor() { }

    getItemsByType(itemsArray: any[], type: string) {

        itemsArray = itemsArray.filter(item => type === item.item_slot_type);
        return itemsArray;
    }

    loadItemsForTier(itemsTier: any[], tier: number) {
        return itemsTier
            .filter(item => item.item_tier === tier)
            .sort((a, b) => a.name.localeCompare(b.name));
    }
}