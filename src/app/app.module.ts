import { BrowserModule }         from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule }              from '@angular/core';
import { ReactiveInputModule }   from '@widgets/reactive/reactive-fields/reactive-input';
import { RequestWrapperModule }  from '@widgets/request-wrapper';
import { InterceptorsModule }    from '@interceptors/interceptors.module';
import {AcronymPipeModule}       from '@pipes/acronym';
import { NzButtonModule }        from 'ng-zorro-antd/button';
import { NzTabsModule }          from 'ng-zorro-antd/tabs';
import { NzCardModule }          from 'ng-zorro-antd/card';
import { NzAvatarModule }        from 'ng-zorro-antd/avatar';
import { AngularTiltModule }     from 'angular-tilt';
import { AppComponent }          from './app.component';

const REACTIVE_FIELDS_MODULES = [ReactiveInputModule];
const ANT_DESIGN_MODULES = [
  NzButtonModule,
  NzTabsModule,
  NzCardModule,
  NzAvatarModule
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularTiltModule,
    InterceptorsModule,
    RequestWrapperModule,
    AcronymPipeModule,
    REACTIVE_FIELDS_MODULES,
    ANT_DESIGN_MODULES
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
