import { AfterViewChecked, Component, OnInit } from '@angular/core';
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
    // console.log('login: setting false');
    // this.authService.setUser(false);
  }

  
  login() {
    const val = this.form.value;
    if(val.username && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe({
          next: (data) => {
            this.authService.
            this.router.navigateByUrl('/');
          },
          error: (err) => {
            console.error(err);
          },
          complete: () => {}
        });
    }
  }

}
