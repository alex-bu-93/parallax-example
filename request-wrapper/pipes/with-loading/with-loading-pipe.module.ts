import { NgModule }        from '@angular/core';
import { WithLoadingPipe } from './with-loading.pipe';

@NgModule({
  declarations: [WithLoadingPipe],
  exports: [WithLoadingPipe]
})
export class WithLoadingPipeModule {
}
