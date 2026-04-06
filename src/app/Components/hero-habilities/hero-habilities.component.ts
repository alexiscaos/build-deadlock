import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef, OnInit } from '@angular/core';
import { HeroeService } from '../../service/heroes/heroe.service';
import { CommonModule } from '@angular/common';
import { ItemService  } from '../../service/shop/items.service';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-hero-habilities',
  imports: [CommonModule],
  templateUrl: './hero-habilities.html',
  styleUrl: './hero-habilities.css',
})


export class HeroHabilities implements OnInit, OnChanges {
  @Input() heroe: any = null;
  public heroeAbilities: any[] = [];
  public allAbilities: any[] = [];
  private isAbilitiesLoaded = false;
  public selectedHability: any = null;
  constructor(private heroService: HeroeService, private cdr: ChangeDetectorRef, private itemService: ItemService, private commonService: CommonService) { }

  ngOnInit() {
    this.loadAllHeroAbilities();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heroe'] && changes['heroe'].currentValue) {
      if (this.isAbilitiesLoaded) {
        this.loadHeroAbilities();
      }
    }
  }

  loadHeroAbilities() {
    if (this.heroe && this.allAbilities.length > 0) {
      this.heroeAbilities = this.commonService.getItemsByHeroeId(this.allAbilities, this.heroe.id);
      this.cdr.detectChanges();
    }
  }

  loadAllHeroAbilities() {
    this.itemService.getItemsByType('ability').subscribe({
      next: (data: any[]) => {
        this.allAbilities = data;
        this.isAbilitiesLoaded = true;
        // Si ya hay un héroe seleccionado, filtra ahora
        this.loadHeroAbilities();
        this.cdr.detectChanges();
      }
    });
  }

  showHabilityInfo(hability: any) {
    this.selectedHability = hability;
  }

  hideHabilityInfo() {
    this.selectedHability = null;
  }
}
