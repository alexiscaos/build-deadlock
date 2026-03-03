import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class HeroeService {
    private baseUrl = "https://assets.deadlock-api.com/v2/heroes";
    public items: any[] = [];

    constructor(private http: HttpClient) { }

    getAllHeroes() {
        return this.http.get<any>(this.baseUrl).pipe(
            map(heroes => {
                return heroes.filter((hero: any) => hero.disabled === false && hero.player_selectable === true);
            })
        );
    }


}