import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ItemService {
    private baseUrl = "https://assets.deadlock-api.com/v2/items";
    public items: any[] = [];

    constructor(private http: HttpClient) { }

    getAllItems() {
        return this.http.get<any>(this.baseUrl);
    }

    getItemsByType(type: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/by-slot-type/${type}`).pipe(
            map(items => {
                return items.filter(item => item.shopable === true);
            })
        );
    }

    loadItemsForTier(itemsTier: any[], tier: number) {
        return itemsTier
            .filter(item => item.item_tier === tier)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

}