import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TransformationViewFacade } from '../transformation-view.facade';
import { TransformersBattleResultsTeam, TransformerStatsProperties, TransformerStatus, TransformersViewDefinition, TransformerTeamLabel } from '../transformation-view.config';
import { convertEnumToArray, KeyValuePair } from '../../../../core/utils';

interface TransformerStatusUi {
  name: string;
  value: number;
}

@Component({
  selector: 'cmp-transformation-view-output',
  templateUrl: './transformation-view-output.component.html',
  styleUrls: ['./transformation-view-output.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransformationViewOutputComponent {
  readonly hadData$ = this.transformationViewFacade.hadData$;
  readonly teamAutobots$ = this.transformationViewFacade.teamAutobots$;
  readonly teamDecepticons$ = this.transformationViewFacade.teamDecepticons$;
  readonly teamsAreValid$ = this.transformationViewFacade.teamsAreValid$;
  readonly battleResults$ = this.transformationViewFacade.battleResults$;

  readonly teamLabel = TransformerTeamLabel;

  constructor(
    private transformationViewFacade: TransformationViewFacade
  ) {
  }

  stats(transformer: TransformersViewDefinition): TransformerStatusUi[] {
    const statProperties = convertEnumToArray(TransformerStatsProperties);

    return statProperties.reduce((statsArray: TransformerStatusUi[], { key: name }: KeyValuePair) => {
      const value = transformer.stats[name];

      return [...statsArray, { name, value }];
    }, [] as TransformerStatusUi[]);
  }

  isDestroyed(transformer: TransformersViewDefinition): boolean {
    return transformer.status === TransformerStatus.Destroyed;
  }

  isSurvivor(transformer: TransformersViewDefinition): boolean {
    return transformer.status === TransformerStatus.Survivor;
  }

  teamMembers(team: TransformersBattleResultsTeam): string {
    const members = team?.members || [];

    return !members.length
      ? '(None)'
      : members.length > 1
        ? members.map(({ name }) => name).join(',')
        : members[0].name;
  }
}
