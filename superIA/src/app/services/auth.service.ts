import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: string | null;
  
  constructor() {
    this.logged = window.sessionStorage.getItem('micuki');
    console.log('cuki',this.logged);
   }

  setUser(logged: any) {
    console.log('set logged to ' + logged);
    window.sessionStorage.removeItem('micuki');
    if(logged)
      window.sessionStorage.setItem('micuki', logged);
    window.location.reload();
  }
}
