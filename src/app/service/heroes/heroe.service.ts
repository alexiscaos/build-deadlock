import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from '../shop/items.service';

@Injectable({ providedIn: 'root' })
export class HeroeService {
    private baseUrl = "https://assets.deadlock-api.com/";

    constructor(private http: HttpClient, private itemService: ItemService) { }

    getAllHeroes() {
        return this.http.get<any>(`${this.baseUrl}v2/heroes`).pipe(
            map(heroes => {
                return heroes.filter((hero: any) => hero.disabled === false && hero.player_selectable === true);
            })
        );
    }

    /**
     * Obtiene las habilidades del héroe filtrando todos los items
     * Si necesitas habilidades específicas del héroe, usa getItemsByType('abilities')
     */
    getHeroAbilities(heroId: string) {
        return this.itemService.getItemsByType('ability').pipe(
            map(abilities => {
                // Aquí puedes añadir lógica adicional si necesitas filtrar por heroId
                // return abilities.filter(ability => ability.hero_id === heroId);
                return abilities;
            })
        );
    }


}