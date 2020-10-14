import { NgModule }                            from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiInterceptor }                      from './api';
import { BearerInterceptor }                   from './bearer';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: BearerInterceptor, multi: true}
  ],
  exports: [HttpClientModule]
})
export class InterceptorsModule {
}
