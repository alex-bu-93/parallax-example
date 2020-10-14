import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { LocalSpinnerComponent } from './local-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LocalSpinnerComponent],
  exports: [LocalSpinnerComponent]
})
export class LocalSpinnerModule {
}
