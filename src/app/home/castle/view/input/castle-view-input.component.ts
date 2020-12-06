import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CastleViewFacade } from '../castle-view.facade';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomControlDestroyNotifier } from '../../../../core/controls/custom-control-destroy-notifier';
import { tap } from 'rxjs/operators';
import { isCastleInputDataValid } from '../castle-view.config';

@Component({
  selector: 'castle-view-input',
  templateUrl: './castle-view-input.component.html',
  styleUrls: ['./castle-view-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastleViewInputComponent extends CustomControlDestroyNotifier implements OnInit {
  @Input() maxLength = 200;

  form: FormGroup;
  readonly dataControlName = 'data';

  constructor(
    private formBuilder: FormBuilder,
    private castleViewFacade: CastleViewFacade
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
        tap(value => this.castleViewFacade.inputData = value)
      )
      .subscribe();

    this.form.get(this.dataControlName).setValue('2,6,6,6,3');
  }

  private inputValidator(): ValidatorFn {
    return ({ value }: FormControl): ValidationErrors | null => {
      if (!!value && !isCastleInputDataValid(value)) {
        return { data: true };
      }

      return null;
    };
  }
}
