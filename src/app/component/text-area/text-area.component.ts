import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, TemplateRef, ViewChild } from '@angular/core';
import { CustomControl } from '../../core/controls/custom-control';
import { buildControlValueAccessorProvider } from '../../core/controls/custom-control.config';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss'],
  providers: [
    buildControlValueAccessorProvider(TextAreaComponent)
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent extends CustomControl {
  @Input() maxLength = 200;
  @Input() label = '';

  @ViewChild('textArea', { static: true }) textArea: ElementRef<HTMLTextAreaElement>;

  readonly errorTemplateName = 'error';

  constructor(
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(changeDetectorRef);
  }

  get isEmpty(): boolean {
    return !this.inputLength;
  }

  get inputLength(): number {
    return this.value.length;
  }

  get showError(): boolean {
    return this.showTemplate(this.errorTemplateName);
  }

  get errorTemplate(): TemplateRef<any> {
    return this.getTemplate(this.errorTemplateName);
  }

  onInput(): void {
    this.CustomControlUpdateModel();
  }

  protected get templateNamesToInitialize(): string [] {
    return [this.errorTemplateName];
  }

  protected CustomControlInitializeModelData(value: string): void {
    this.value = value;
    this.changeDetectorRef.markForCheck();
  }

  protected CustomControlModelChangeGetValues(): string {
    return this.value;
  }

  private get value(): string {
    return this.textArea.nativeElement.value;
  }

  private set value(value: string) {
    this.textArea.nativeElement.value = value;
  }
}
