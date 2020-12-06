import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CastleViewFacade } from '../castle-view.facade';

@Component({
  selector: 'castle-view-output',
  templateUrl: './castle-view-output.component.html',
  styleUrls: ['./castle-view-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastleViewOutputComponent {
  readonly componentData$ = this.castleViewFacade.componentData$;

  constructor(
    private castleViewFacade: CastleViewFacade
  ) {
  }
}
