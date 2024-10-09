import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    // Attributes
    private baseUrl = environments.baseUrl;
    private user?: User;

    // Constructor
    constructor(private http: HttpClient) { }

    // Getter
    get currentUser() : User | undefined {

        if (!this.user) return undefined;

        return structuredClone(this.user);
    }

    // Methods
    public login( email: string, password: string ): Observable<User> {

        //  http.post( 'login', {email, password} );

        return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            tap( user => this.user = user),
            tap( user => localStorage.setItem('token', user.id.toString() ) )
        )
    }

    public checkAuthenticationStatus(): Observable<boolean> {
        
        if( !localStorage.getItem('token') ) return of(false);

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${ this.baseUrl }/users/1`)
        .pipe(
            tap( user => this.user = user ),
            map( user => !!user ),
            catchError( err => of(false) )
        );
    }


    public logout(): void {
        this.user = undefined;
        localStorage.clear();
    }

    
}