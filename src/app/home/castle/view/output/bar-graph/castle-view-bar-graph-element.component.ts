import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CastleViewDefinition } from '../../castle-view.config';

@Component({
  selector: 'castle-view-bar-graph-element',
  templateUrl: './castle-view-bar-graph-element.component.html',
  styleUrls: ['./castle-view-bar-graph-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CastleViewHistogramElementComponent {
  @Input() value: CastleViewDefinition;

  get height(): number {
    return this.value.height * 10;
  }

  get isCastle(): boolean {
    return (this.isPeak || this.isValley) && !this.value.parent;
  }

  get isLargeCastle(): boolean {
    return this.isCastle && Boolean(this.value.platformElements?.length);
  }

  get isPeak(): boolean {
    return this.value.isPeak || this.value.parent?.isPeak;
  }

  get isValley(): boolean {
    return this.value.isValley || this.value.parent?.isValley;
  }
}
