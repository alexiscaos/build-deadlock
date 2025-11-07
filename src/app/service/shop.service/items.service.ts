import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class ItemService {
    private baseUrl = "https://assets.deadlock-api.com/v2/items/by-slot-type";

    constructor(private http: HttpClient) { }

    getItems(type: string, tier: number) {
        return this.http.get<any>(`${this.baseUrl}/${type}`);
    }

}