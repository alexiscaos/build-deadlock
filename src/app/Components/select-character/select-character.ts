import { Component, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { HeroeService } from '../../service/heroes/heroe.service';
import { CommonService } from '../../service/common.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-character',
  imports: [CommonModule],
  templateUrl: './select-character.html',
  styleUrl: './select-character.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectCharacter {
  constructor(private heroService: HeroeService, private commonService: CommonService, private cdr: ChangeDetectorRef) { }
  public allHeroes: any[] = [];
  public heroeSelected: any = null;
  private selectionTImer: any;

  private heroModelConfig:any = {
    'Abrams':{target:'40cm 1.7m 1m', orbit:'62deg 101deg 0m', fov:'20deg'},
    'Holliday':{target:'0cm 1.21m 1m', orbit:'-17deg 95deg 0m', fov:'10deg'},

  }
  ngOnInit() {
    this.loadAllHeroes();
  }

  loadAllHeroes() {
    this.heroService.getAllHeroes().subscribe({
      next: (data: any[]) => {
        this.allHeroes = this.commonService.sortByNameAlphabetical(data);
        if (this.allHeroes.length > 0) {
          this.heroeSelected = this.allHeroes[0];
        }
      },
      error: (error) => {
        console.error('Error fetching heroes:', error);
      }
    }); 
  }

  showHeroDetails(heroe: any, event: MouseEvent) {
    this.heroeSelected = heroe;
  }

  onMouseEnterHero(heroe: any) {
    this.clearTimer();
    this.selectionTImer = setTimeout(() => {
      this.heroeSelected = heroe;
      this.cdr.detectChanges();
    }, 500);
  }

  private clearTimer() {
    if (this.selectionTImer) {
      clearTimeout(this.selectionTImer);
      this.selectionTImer = null;
    }
  }

  onMouseLeaveHero() {
    this.clearTimer();
  }

  getHeroConfig(heroName: string, property: string){
    const defaultConfig: any = {
      target: "0m 50cm -1m",
      orbit: "0deg 95deg 3m",
      fov: "25deg"
    }
    return this.heroModelConfig[heroName]?.[property] || defaultConfig[property];  
  }
}
