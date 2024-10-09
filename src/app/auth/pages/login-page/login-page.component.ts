import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {

  constructor(
    private authservice: AuthService,
    private router: Router
  ){}

  public onLogin(): void{

    this.authservice.login('emmanuel@gmail.com', '123456')
    .subscribe(  user => {

      this.router.navigate(['/']);

    });

  }

}
