import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { PATTERNS_LIST }                                        from '@constants/patterns';
import includes                                                 from 'lodash-es/includes';

const getPatternMsg = (pattern: RegExp): string => PATTERNS_LIST.find(x => includes(pattern, x['PATTERN']))['MESSAGE'];

@Component({
  selector: 'app-validation-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-validation-message.component.html',
  styles: [`
    .form-help-text {
      color: red;
      position: absolute;
      bottom: -20px;
      width: 100%;
      font-size: 0.8em;
      line-height: 20px;
    }
  `]
})
export class ReactiveValidationMessageComponent implements OnChanges {

  /**
   * validationErrors is a reactive form errors
   * it's nonnull in case if the control is touched and invalid,
   * which is defined on the reactive base component side
   */
  @Input() validationErrors = null;

  errorMessage: string = null;

  ngOnChanges() {
    const errors = this.validationErrors;
    this.errorMessage = errors ? errors['required'] ? 'Need to fill'
      : errors['minlength'] ? `Minimum ${errors['minlength']['requiredLength']} symbols`
        : errors['maxlength'] ? `Maximum ${errors['maxlength']['requiredLength']} symbols`
          : errors['min'] ? `Minimum ${errors['min']['min']}`
            : errors['max'] ? `Maximum ${errors['max']['max']}`
              : errors['pattern'] ? getPatternMsg(errors['pattern']['requiredPattern'])
                : errors['customError'] ? errors['customError']
                  : null
      : null;
  }
}
