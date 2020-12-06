import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { defaultPageHeaderNavigateBackParameters, PageHeaderNavigateBackParameters } from './page-header.config';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageHeaderComponent {
  @Input() title: string;

  @Input() set navigateBackParameters(value: PageHeaderNavigateBackParameters) {
    this._navigateBackParameters = value;
  }

  @Output() navigateBack = new EventEmitter<PageHeaderNavigateBackParameters>();

  private _navigateBackParameters = defaultPageHeaderNavigateBackParameters;

  constructor(
    private router: Router
  ) {
  }

  back(): void {
    if (this.navigateBack.observers.length) {
      this.navigateBack.emit(this._navigateBackParameters);
    } else {
      const { commands, extras } = this._navigateBackParameters;

      this.router.navigate(commands, extras);
    }
  }
}
