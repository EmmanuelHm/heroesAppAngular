import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})

export class HeroesService {

    // Variable de entorno
    private baseUrl: string = environments.baseUrl;

    // Constructor
    constructor(private http: HttpClient) { }


    // PETICIONES

    // Obtener Heroes
    public getHeroes(): Observable<Heroe[]> {
        return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
    }

    // Obtener Heroe
    public getHeroById( id : string ): Observable<Heroe | undefined> {
        return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError( error =>  of(undefined) )
        );
    }
    // Buscar un heroe
    public getSuggestions( query: string ): Observable<Heroe[]> {
        return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }
    
    // Agregar un Heroe
    public addHero( hero: Heroe ): Observable<Heroe>{
        return this.http.post<Heroe>(`${this.baseUrl}/heroe`, hero );
    }

    // Actualizar un Heroe
    public updateHero( hero: Heroe ): Observable<Heroe>{

        if(!hero.id) throw Error('Hero id is required');

        // return this.http.put<Heroe>(`${this.baseUrl}/heroe/${ hero.id }`, hero );  //Actualiza completamente un obj
        return this.http.patch<Heroe>(`${this.baseUrl}/heroe/${ hero.id }`, hero );   //Actualiza parcialmente
    }

    // Borrar un Heroe
    public deleteHeroById( id: string ): Observable<boolean>{

        return this.http.delete<boolean>(`${this.baseUrl}/heroe/${ id }`)
            .pipe(
                catchError( err => of(false) ),
                map( resp => true ),
            );
    }
}