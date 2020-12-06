import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomControlDestroyNotifier } from '../../../../core/controls/custom-control-destroy-notifier';
import { tap } from 'rxjs/operators';
import { TransformationViewFacade } from '../transformation-view.facade';
import { isTransformersInputValid } from '../transformation-view.config';

@Component({
  selector: 'cmp-transformation-view-input',
  templateUrl: './transformation-view-input.component.html',
  styleUrls: ['./transformation-view-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformationViewInputComponent extends CustomControlDestroyNotifier implements OnInit {
  @Input() maxLength = 200;

  form: FormGroup;
  readonly dataControlName = 'data';

  constructor(
    private formBuilder: FormBuilder,
    private transformationViewFacade: TransformationViewFacade
  ) {
    super();
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      data: [null, [Validators.required, Validators.maxLength(this.maxLength), this.inputValidator()]]
    });

    this.sink = this.form.get(this.dataControlName)
      .valueChanges
      .pipe(
        tap(value => this.transformationViewFacade.inputData = value)
      )
      .subscribe();

    this.form.get(this.dataControlName).setValue('Soundwave,D,8,9,2,6,7,5,6,10\nBluestreak,A,6,6,7,9,5,2,9,7\nHubcap,A,4,4,4,4,4,4,4,4');
  }

  private inputValidator(): ValidatorFn {
    return ({ value }: FormControl): ValidationErrors | null => {
      if (!!value && !isTransformersInputValid(value)) {
        return { data: true };
      }

      return null;
    };
  }
}
