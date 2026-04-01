import { Injectable } from '@angular/core'

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

    sortByNameAlphabetical<T extends { name: string }>(array: T[]): T[] {
        array = [...array].sort((a, b) => a.name.localeCompare(b.name));
        return array;
    }

    getItemsByHeroeId(itemsArray: any[], heroId: string) {
        console.log(`Filtrando habilidades para el héroe con ID: ${heroId}`);
        console.log(`Número total de habilidades antes de filtrar: ${itemsArray.length}`);
        itemsArray = itemsArray.filter(item => item.hero === heroId);
        console.log(`Habilidades filtradas para el héroe ${heroId}:`, itemsArray);
        return itemsArray;
    }
}