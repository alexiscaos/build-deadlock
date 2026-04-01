import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ItemService {
    private baseUrl = "https://assets.deadlock-api.com/v2/items";
    public items: any[] = [];

    constructor(private http: HttpClient) { }

    /**
     * Obtiene TODOS los items sin filtrar
     * Cada componente puede filtrar según lo necesite
     */
    getAllItems() {
        return this.http.get<any>(this.baseUrl);
    }

    /**
     * Obtiene solo los items que se pueden comprar en la tienda
     */
    getShopItems() {
        return this.getAllItems().pipe(
            map(items => {
                return items.filter((item: any) => item.shopable === true);
            })
        );
    }

    /**
     * Obtiene items filtrados por un tipo específico
     */
    getItemsByType(itemType: string) {
        return this.getAllItems().pipe(
            map(items => {
                return items.filter((item: any) => item.type === itemType);
            })
        );
    }


}