import { Directive, HostListener, Input } from '@angular/core';
import includes                           from 'lodash-es/includes';

@Directive({selector: '[onInputDirective]'})
export class OnInputDirective {

  @Input('onInputDirective') option: string;

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    switch (this.option) {
      case 'numbers-only':
        const key = event.key;
        const allowedKeysList = ['Tab', 'Backspace', 'ArrowRight', 'ArrowLeft', 'Delete', '.', '.'];
        /**
         *  isNumberPressed === true, if key is allowed,
         *  isNumberPressed === false - in other case
         */
        const isNumberPressed = !!(key >= '0' && key <= '9');
        /**
         *  isPermitted === true, if key is allowed,
         *  isPermitted === false - in other case
         */
        const isPermitted = event.ctrlKey || includes(allowedKeysList, key);
        return isPermitted || isNumberPressed;
      default:
        return true;
    }
  }
}
