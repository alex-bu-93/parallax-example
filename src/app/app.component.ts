import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators }                                   from '@angular/forms';
import {bounceInUpAnimation, fadeInUpAnimation, fadeOutUpAnimation} from 'angular-animations';
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
  {type: 'value-1', bottom: '20%', left: '6%', width: '', isRendered: false, timeout: 300},
  {type: 'front-2', bottom: '10%', left: '13%', width: '', isRendered: false, timeout: 400},
  {type: 'front-3', bottom: '17%', left: '38%', width: '', isRendered: false, timeout: 450},
  {type: 'value-2', bottom: '10%', left: '62%', width: '', isRendered: false, timeout: 400},
  {type: 'front-4', bottom: '15%', left: '68%', width: '', isRendered: false, timeout: 200},
  {type: 'front-1', bottom: '4%', left: '6%', width: '', isRendered: false, timeout: 150},
  {type: 'value-3', bottom: '30%', left: '84%', width: '', isRendered: false, timeout: 700},
  {type: 'value-4', bottom: '5%', left: '2%', width: '', isRendered: false, timeout: 500},
  {type: 'value-5', bottom: '20%', left: '24%', width: '', isRendered: false, timeout: 300},
  {type: 'value-6', bottom: '8%', left: '40%', width: '', isRendered: false, timeout: 200},
  {type: 'value-7', bottom: '12%', left: '76%', width: '', isRendered: false, timeout: 150}
];

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    bounceInUpAnimation(),
    fadeInUpAnimation({duration: 800, translate: '30px'}),
    fadeOutUpAnimation({duration: 800, translate: '30px'})
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

  isPhraseRendered = false;
  isSwitchingTab = false;
  isTrue200Delay: boolean;
  isTrue300Delay: boolean;
  isTrue400Delay: boolean;
  isHeaderRendered: boolean;

  constructor(
    private appService: AppService,
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => { this.isPhraseRendered = true; this.cdr.markForCheck(); }, 100);
    setTimeout(() => this.candles.forEach((candle, index) =>
      setTimeout(() => { candle.isRendered = true; this.cdr.markForCheck(); }, index * 50)
    ), 200);
    setTimeout(() => [200, 300, 400].forEach(delay =>
      setTimeout(() => { this[`isTrue${delay}Delay`] = true; this.cdr.markForCheck(); }, delay)
    ), 600);
    setTimeout(() => { this.isHeaderRendered = true; this.cdr.markForCheck(); }, 1000);
    setTimeout(() => this.bottomItems.forEach(item =>
      setTimeout(() => { item.isRendered = true; this.cdr.markForCheck(); }, item.timeout)
    ), 1000);
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
        this.isSwitchingTab = true;
        setTimeout(() => {
          this.isSwitchingTab = false;
          this.selectedIndex = Tabs.Login;
          this.cdr.markForCheck();
          }, 800);
        break;
      case Tabs.Login:
        this.isPhraseRendered = false;
        this.selectedIndex = Tabs.Welcome;
        setTimeout(() => {
          this.isPhraseRendered = true;
          this.cdr.markForCheck();
        }, 0);
        break;
      case Tabs.Scopes:
        this.appService.logout();
        this.selectedIndex = Tabs.Login;
        break;
    }
  }
}
