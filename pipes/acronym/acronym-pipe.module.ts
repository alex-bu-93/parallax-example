import { NgModule }    from '@angular/core';
import { AcronymPipe } from './acronym.pipe';

@NgModule({
  declarations: [AcronymPipe],
  exports: [AcronymPipe]
})
export class AcronymPipeModule {
}
