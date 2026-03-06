import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeroeService } from '../../service/heroes/heroe.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-select-character',
  imports: [],
  templateUrl: './select-character.html',
  styleUrl: './select-character.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectCharacter {
  constructor(private heroService: HeroeService, private commonService: CommonService) { }
  public allHeroes: any[] = [];

  ngOnInit() {
    this.loadAllHeroes();
    console.log(this.allHeroes);
  }

  loadAllHeroes() {
    this.heroService.getAllHeroes().subscribe({
      next: (data: any[]) => {
        this.allHeroes = this.commonService.sortByNameAlphabetical(data);
      },
      error: (error) => {
        console.error('Error fetching heroes:', error);
      }
    }); 
  }

}
