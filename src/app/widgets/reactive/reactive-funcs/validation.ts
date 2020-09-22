import { AbstractControl, FormGroup } from '@angular/forms';

/**
 * Method return boolean value depends on input control requirement
 */
export function hasRequiredValidator(abstractControl: AbstractControl): boolean {
  const validator = abstractControl && abstractControl.validator ? abstractControl.validator({} as AbstractControl) : null;
  return validator && validator.required;
}

/**
 *  Method return vertical coordinates of the input document element
 */
function getVerticalCoordinate(el) {
  let y = 0;
  const fieldHeight = 50;
  while (el && !isNaN(el.offsetTop)) {
    y += el.offsetTop - el.scrollTop;
    el = el.offsetParent;
  }
  return y > fieldHeight ? y - fieldHeight : y;
}

/**
 * Method validates if all control of the input form group are valid
 * If not, it marks them touched to trigger required validation procedures
 */
export function markTouchedAndScroll(formGroup: FormGroup) {
  formGroup.markAllAsTouched();
  const controlsKeys = Object.keys(formGroup.controls);
  for (let i = 0; i < controlsKeys.length; ++i) {
    const key = controlsKeys[i];
    const control = formGroup.get(key);
    if (control.status === 'INVALID') {
      const el = document.getElementById(key);
      if (el) {
        el.focus();
        window.scrollTo({top: getVerticalCoordinate(el), behavior: 'smooth'});
      }
      return;
    }
  }
}
