import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
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
    public getHeroById(id : string): Observable<Heroe | undefined> {
        return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
        .pipe(
            catchError( error =>  of(undefined) )
        );
    }
    // Buscar un heroe
    public getSuggestions( query: string): Observable<Heroe[]> {
        return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
    }
    
}