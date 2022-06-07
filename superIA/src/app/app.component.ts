import { AfterContentInit, AfterViewInit, Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'superIA';
  showFiller = false;
  user: any;
  loggedIn: string | null;

  constructor(private authService: AuthService, private router: Router) {
    console.log('construction');

    // this.authService.user$
    // .subscribe((data) => {
    //   console.log('app component: ', data);
    //   this.user = data;
    //   if(data)
    //     this.loggedIn = true;
    //   else 
    //     this.loggedIn = false;
    // });
    this.loggedIn = this.authService.logged;
    if(this.loggedIn) {
      console.log('logged in');
      this.router.navigate(['/']);
    }else{ 
      console.log('NOT logged in');
      this.router.navigate(['/login']);
    }
  }

   log() {
     console.log(this.user);
   }

   logOut() {
    this.authService.setUser(false);
  }

   ngOnInit() {
   }
}
