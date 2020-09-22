import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';
import { NzInputModule }          from 'ng-zorro-antd/input';
import { NzFormModule }           from 'ng-zorro-antd/form';
import { ReactiveInputComponent } from './reactive-input.component';
import { OnInputDirectiveModule } from '../../reactive-directives/on-input';
import { ReactiveInfoModule }     from '../../reactive-info';

const FORM_MODULES = [ReactiveFormsModule];
const ANT_DESIGN_MODULES = [NzFormModule, NzInputModule];

@NgModule({
  imports: [
    CommonModule,
    ReactiveInfoModule,
    OnInputDirectiveModule,
    FORM_MODULES,
    ANT_DESIGN_MODULES
  ],
  declarations: [ReactiveInputComponent],
  exports: [ReactiveInputComponent]
})
export class ReactiveInputModule {
}
