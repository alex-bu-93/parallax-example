import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractReactive }                       from '../abstract-reactive';

@Component({
  selector: 'app-reactive-input',
  templateUrl: './reactive-input.component.html'
})
export class ReactiveInputComponent extends AbstractReactive {

  /**
   * maxLength is a number of input value maximum length
   */
  @Input() maxLength: number;

  @Input() onInputDirective: 'numbers-only';
  @Input() onInputPipe: 'card-number';

  @Input() type = 'text';

  @Output() enterPress = new EventEmitter();
}
