import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {

  
  public searchInput = new FormControl('');
  public heroes: Heroe[] = [];
  public selectedHero?: Heroe;
  
  constructor(
    private heroesService: HeroesService
  ){}

  public searchHero(): void { 
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
    .subscribe( heroes => this.heroes = heroes );
  }

  public onSelectedOption( event: MatAutocompleteSelectedEvent ): void{

    if ( !event.option.value ) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Heroe = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

  }

}
