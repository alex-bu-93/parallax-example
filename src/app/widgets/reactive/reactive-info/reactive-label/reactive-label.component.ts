import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-reactive-label',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './reactive-label.component.html',
  styles: [`:host { line-height: 14px }`]
})
export class ReactiveLabelComponent {

  /**
   * fieldId is a unique field identifier to match field with it's label / tooltip message
   */
  @Input() fieldId: string = null;

  /**
   * hasRequiredIndicator is a flag to show or not red-color start in label
   */
  @Input() hasRequiredIndicator: boolean = null;

  /**
   * Tooltip is some text which appear on hover info-icon next to label
   */
  @Input() tooltip: string | TemplateRef<void>;

  /**
   * tooltipPosition - custom tooltip placement
   * values: bottom, top, right, left
   */
  @Input() tooltipPosition = 'top';

  /**
   * label is a main text characterizing the field
   */
  @Input() label: string = null;

  /**
   * showTooltip - flag to show tooltip message
   */
  @Input() showTooltip = false;
}
