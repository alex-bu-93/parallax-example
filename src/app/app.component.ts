import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators }                                   from '@angular/forms';
import {bounceInUpAnimation, fadeInUpAnimation, fadeOutUpAnimation, rotateInUpLeftAnimation} from 'angular-animations';
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
const BOTTOM_ITEMS = [
  {type: 'i-euro', bottom: '15%', left: '10%', isRendered: false, timeout: 300},
  {type: 'pound', bottom: '30%', left: '23%', isRendered: false, timeout: 400},
  {type: 'sbet salut', bottom: '50%', left: '35%', isRendered: false, timeout: 450},
  {type: 'currency', bottom: '5%', left: '40%', isRendered: false, timeout: 400},
  {type: 'yuan', bottom: '5%', left: '65%', isRendered: false, timeout: 200},
  {type: 'dollar', bottom: '1%', left: '80%', isRendered: false, timeout: 150},
  {type: 'ruble', bottom: '55%', left: '80%', isRendered: false, timeout: 700}
];

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    bounceInUpAnimation(),
    fadeInUpAnimation({duration: 1200, translate: '30px'}),
    fadeOutUpAnimation({duration: 800, translate: '30px'}),
    rotateInUpLeftAnimation({degrees: 200})
  ]
})
export class AppComponent implements AfterViewInit {

  tabs = Tabs;
  selectedIndex = this.appService.isLoggedIn ? Tabs.Scopes : Tabs.Welcome;

  fg = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl('')
  });

  login$ = of({});
  scopes$ = this.appService.getScopes();

  candles = CANDLES;
  bottomItems = BOTTOM_ITEMS;

  isSwitchingTab = false;
  isHeaderRendered: boolean;
  isSloganRendered = false;
  is1WaveRendered: boolean;
  is2WaveRendered: boolean;
  is3waveRendered: boolean;
  isBottomLogoRendered = false;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => { this.isSloganRendered = true; this.cdr.markForCheck(); }, 100);
    setTimeout(() => {
      setTimeout(() => { this.is1WaveRendered = true; this.cdr.markForCheck(); }, 200);
      setTimeout(() => { this.is2WaveRendered = true; this.cdr.markForCheck(); }, 300);
      setTimeout(() => { this.is3waveRendered = true; this.cdr.markForCheck(); }, 400);
      setTimeout(() => { this.isBottomLogoRendered = true; this.cdr.markForCheck(); }, 400);
    }, 600);
    setTimeout(() => this.candles.forEach((candle, index) =>
      setTimeout(() => { candle.isRendered = true; this.cdr.markForCheck(); }, index * 20)
    ), 200);
    setTimeout(() => { this.isHeaderRendered = true; this.cdr.markForCheck(); }, 1000);
    setTimeout(() => this.bottomItems.forEach(item =>
      setTimeout(() => { item.isRendered = true; this.cdr.markForCheck(); }, item.timeout)
    ), 1000);
  }

  ngAfterViewInit() {
    const parallaxInstance = new Parallax(document.getElementById('scene'));
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
        this.isSwitchingTab = true;
        setTimeout(() => {
          this.isSwitchingTab = false;
          this.selectedIndex = Tabs.Login;
          this.cdr.markForCheck();
          }, 800);
        break;
      case Tabs.Login:
        this.isSloganRendered = false;
        this.selectedIndex = Tabs.Welcome;
        this.login$ = of({});
        setTimeout(() => {
          this.isSloganRendered = true;
          this.cdr.markForCheck();
        }, 0);
        break;
      case Tabs.Scopes:
        this.appService.logout();
        this.selectedIndex = Tabs.Login;
        this.login$ = of({});
        break;
    }
  }
}
