import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransformationViewFacade } from './transformation-view.facade';

@Component({
  templateUrl: './transformation-view.component.html',
  styleUrls: ['./transformation-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TransformationViewFacade]
})
export class TransformationViewComponent {
}
