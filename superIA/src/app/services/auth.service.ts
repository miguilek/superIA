import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, tap } from 'rxjs';
import * as moment from 'moment';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL = environment.apiUrl;
  logged: boolean = false;
  $logged: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) {
    this.$logged.next(this.logged);
  }

  login(username: string, password: string) {
    return this.http.post(this.API_URL + '/users/authenticate', {username,password})
      .pipe(
        tap(data => this.setSession(data)),
        tap( () => this.$logged.next(true))
      );
  }

  setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.$logged.next(false);
  }

  public isLoggedIn() {
    return true;
    if(!localStorage.getItem('id_token')){
      this.logout();
      return false;
    } else 
        return moment().isBefore(this.getExpiration());
  }

  public getLoggedIn() {
    return this.$logged.asObservable();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    let expiresAt;
    try{
      expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    } catch {
      this.logout();
      window.location.reload();
    }
    return moment(expiresAt);
  }
}
