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
        return this.http.get<any>(this.baseUrl).pipe(
            map(items => {
                return items.filter((item: any) => item.shopable === true);
            })
        );
    }


}