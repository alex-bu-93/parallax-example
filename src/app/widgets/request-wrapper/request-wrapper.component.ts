import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Observable, throwError }                                                     from 'rxjs';
import { catchError, tap }                                                            from 'rxjs/operators';

@Component({
  selector: 'app-request-wrapper',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './request-wrapper.component.html',
  styles: [`
    :host::ng-deep.ant-result-subtitle { word-break: break-word }
    :host { width: 100% }
  `]
})
export class RequestWrapperComponent<T = any> implements OnChanges {

  @Input() request$: Observable<T>;
  @Output() response = new EventEmitter();
  @Output() retry = new EventEmitter();
  @Output() back = new EventEmitter();

  public data: T;

  ngOnChanges() { this.request$ = this.getUpdatedRequest(this.request$); }

  getUpdatedRequest(request$: Observable<T>) {
    return request$ && request$.pipe(
      tap(res => this.emitValue(res)),
      catchError(err => throwError(err))
    );
  }

  private emitValue(value) {
    this.data = value;
    this.response.emit(value);
  }
}
