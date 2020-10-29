import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap }        from 'rxjs/operators';
import {of} from "rxjs";

interface LoginFg {
  login: string,
  password: string
}
const FAKE_ROBOTS = [{}, {}, {}, {}];
const THEMES = [
  {bgColor: '#FEEDEA', iconColor: '#F2674C', icon: 'wallet'},
  {bgColor: '#F2E6FC', iconColor: '#B16DF1', icon: 'sliders'},
  {bgColor: '#E7F7F9', iconColor: '#26C6DA', icon: 'bank'},
  {bgColor: '#FEF9E0', iconColor: '#FFD200', icon: 'security-scan'},
];
const shuffle = arr => arr.sort(() => Math.random() - 0.5);

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
    const shuffledIndexes = shuffle(FAKE_ROBOTS.map((x, i) => i));
    FAKE_ROBOTS.forEach((x, i) => x['theme'] = THEMES[shuffledIndexes[i]]);
    return of(FAKE_ROBOTS);
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}



