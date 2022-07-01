import { AfterViewChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  public emailFormControl = new FormControl('', [Validators.required]);
  form: FormGroup;

  @Output() evtLogin: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ngOnInit() { 
    if(this.authService.isLoggedIn)
      this.router.navigateByUrl('/');
  }
  
  login() {
    const val = this.form.value;
    if(val.username && val.password) {
      this.authService.login(val.username, val.password)
        .subscribe({
          next: (data) => {
            window.location.reload();
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.error('loginComponent.ts:' ,'Error logging in.' + err);
            window.location.reload();
            this.authService.logout();
          },
          complete: () => {}
        });
    }
  }
}
