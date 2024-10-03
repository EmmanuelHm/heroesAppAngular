import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
})
export class HeroPageComponent implements OnInit {

  public hero?: Heroe;

  constructor(
    private heroesService : HeroesService,
    // Obtener Heroe de URL (paramentros URL)
    private activatedRoute: ActivatedRoute,
    // Dirigir la página a otra ruta
    private router: Router
  ) {}


  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        delay(3000), //Tiempo espera para una peticion
        switchMap( ({ id }) => this.heroesService.getHeroById(id) ),
      )
      .subscribe( hero => {
        if(!hero) return this.router.navigate(['/heroes/list']);

        this.hero = hero;
        return;
      })
    
  }


  public goBack(): void {
    this.router.navigateByUrl('heroes/list')
  }
  

}
