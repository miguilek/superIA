import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // console.log('login: setting false');
    // this.authService.setUser(false);
  }

  
  logIn() {
    this.authService.setUser(true);
  }

}
