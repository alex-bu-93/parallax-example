import { BrowserModule }     from '@angular/platform-browser';
import { NgModule }          from '@angular/core';
import { NzButtonModule }    from 'ng-zorro-antd/button';
import { AngularTiltModule } from 'angular-tilt';
import { AppComponent }      from './app.component';

const ANT_DESIGN_MODULES = [NzButtonModule];

@NgModule({
  imports: [
    BrowserModule,
    AngularTiltModule,
    ANT_DESIGN_MODULES
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
