import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Parallax from 'parallax-js';

enum Tabs {
  Welcome = 0,
  Login = 1,
  Scopes = 2
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  selectedIndex = 0;

  fg = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  isTrue200Delay: boolean;
  isTrue300Delay: boolean;
  isTrue400Delay: boolean;
  isTrue900Delay: boolean;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
    setTimeout(() => { this.isTrue200Delay = true; this.cdr.markForCheck(); }, 200);
    setTimeout(() => { this.isTrue300Delay = true; this.cdr.markForCheck(); }, 300);
    setTimeout(() => { this.isTrue400Delay = true; this.cdr.markForCheck(); }, 400);
    setTimeout(() => { this.isTrue900Delay = true; this.cdr.markForCheck(); }, 900);
  }

  ngAfterViewInit() {
    const scene = document.getElementById('scene');
    const parallaxInstance = new Parallax(scene);
  }

  onSubmit() {
    if (this.fg.valid) {
      this.selectedIndex = Tabs.Scopes;
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
        this.selectedIndex = Tabs.Login;
        break;
    }
  }
}
