import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators }                from '@angular/forms';
import Parallax                                              from 'parallax-js';

enum Tabs {
  Welcome = 0,
  Login = 1,
  Scopes = 2
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  selectedIndex = 0;

  fg = new FormGroup({
    login: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

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
