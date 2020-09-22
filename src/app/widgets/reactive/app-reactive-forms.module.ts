import { NgModule }             from '@angular/core';
import { ReactiveInputModule }  from './reactive-fields/reactive-input';

const APP_REACTIVE_COMPONENTS_MODULES = [ReactiveInputModule];

@NgModule({
  imports: [APP_REACTIVE_COMPONENTS_MODULES],
  exports: [APP_REACTIVE_COMPONENTS_MODULES]
})
export class AppReactiveFormsModule {
}

