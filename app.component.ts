import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators }                                   from '@angular/forms';
import Parallax                                                                 from 'parallax-js';
import { of }                                                                   from 'rxjs';
import { tap }                                                                  from 'rxjs/operators';
import { AppService }                                                           from './app.service';

enum Tabs {
  Welcome = 0,
  Login = 1,
  Scopes = 2
}

const CANDLES = [
  {top: '0', width: 20, isRendered: false},
  {top: '25px', width: 20, isRendered: false},
  {top: '130px', width: 20, isRendered: false},
  {top: '80px', width: 20, isRendered: false},
  {top: '50px', width: 20, isRendered: false},
  {top: '100px', width: 20, isRendered: false},
  {top: '110px', width: 20, isRendered: false},
  {top: '50px', width: 20, isRendered: false},
  {top: '0', width: 20, isRendered: false},
  {top: '-35px', width: 20, isRendered: false},
  {top: '-90px', width: 20, isRendered: false},
  {top: '-55px', width: 20, isRendered: false},
  {top: '50px', width: 20, isRendered: false},
  {top: '-45px', width: 20, isRendered: false},
  {top: '50px', width: 20, isRendered: false},
  {top: '-100px', width: 20, isRendered: false}
];

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  selectedIndex = this.appService.isLoggedIn ? Tabs.Scopes : Tabs.Welcome;

  fg = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl('')
  });

  login$ = of({});
  scopes$ = this.appService.getScopes();

  candles = CANDLES;

  isTrue200Delay: boolean;
  isTrue300Delay: boolean;
  isTrue400Delay: boolean;
  isTrue900Delay: boolean;
  isHeaderRendered: boolean;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => this.candles.forEach((candle, index) =>
      setTimeout(() => { candle.isRendered = true; this.cdr.markForCheck(); }, index * 40)
    ), 200);
    setTimeout(() => [200, 300, 400, 900].forEach(delay =>
      setTimeout(() => { this[`isTrue${delay}Delay`] = true; this.cdr.markForCheck(); }, delay)
    ), 600);
    setTimeout(() => { this.isHeaderRendered = true; this.cdr.markForCheck(); }, 1000)
  }

  ngAfterViewInit() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
  }

  onSubmit() {
    if (this.fg.valid) {
      this.login$ = this.appService.login(this.fg.value).pipe(
        tap(() => this.selectedIndex = Tabs.Scopes),
        tap(() => this.scopes$ = this.appService.getScopes())
      );
    } else {
      this.fg.markAllAsTouched();
    }
  }

  onSwitchTab() {
    switch (this.selectedIndex) {
      case Tabs.Welcome:
        this.selectedIndex = Tabs.Login;
        break;
      case Tabs.Login:
        this.selectedIndex = Tabs.Welcome;
        break;
      case Tabs.Scopes:
        this.appService.logout();
        this.selectedIndex = Tabs.Login;
        break;
    }
  }
}
