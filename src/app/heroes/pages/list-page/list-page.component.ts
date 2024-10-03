import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit{

  public heroes: Heroe[] = [];

  constructor( private heroesService: HeroesService ) {}

  ngOnInit(): void {
    // Cargar del servicio los heroes
     this.heroesService.getHeroes().subscribe( heroes => this.heroes = heroes);
  }

}
