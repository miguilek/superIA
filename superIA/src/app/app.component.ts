import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'superIA';
  showFiller = false;
  user: any;
  loggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    this.loggedIn = this.authService.isLoggedIn();

    this.authService.getLoggedIn()
      .subscribe( data => {
        this.loggedIn = data;
      });

  }

  logout() {
    // Logout en servicio
    this.authService.logout();
    // Reload para recargar loggedIn
    window.location.reload();
    // Vamos navegando a /login porque el guard es lento y se desincroniza con el routeroutlet
    this.router.navigateByUrl('/login');
  }

}