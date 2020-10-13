import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }        from 'rxjs/operators';

interface LoginFg {
  login: string,
  password: string
}

@Injectable({providedIn: 'root'})
export class AppService {

  isLoggedIn = !!sessionStorage.getItem('token');

  constructor(
    private http: HttpClient
  ) {
  }

  login(fg: LoginFg) {
    return this.http.post('/v1/auth/Login', fg).pipe(
      tap(res => res && sessionStorage.setItem('token', res['token']))
    );
  }

  getScopes() {
    return this.http.get('/v1/Scopes');
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
