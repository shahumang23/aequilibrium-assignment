import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import {
  checkTransformerTeamsAreValid,
  checkTransformerTeamsDefined,
  createTransformers, emptyBattleResults,
  getBattleResults, TransformersBattleResults,
  TransformersViewDefinition,
  TransformerTeam
} from './transformation-view.config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransformationViewFacade {
  private teamAutobotsSource = new BehaviorSubject<TransformersViewDefinition[]>([]);
  private teamDecepticonsSource = new BehaviorSubject<TransformersViewDefinition[]>([]);
  private battleResultsSource = new BehaviorSubject<TransformersBattleResults>(emptyBattleResults);

  readonly teamAutobots$ = this.teamAutobotsSource.asObservable();
  readonly teamDecepticons$ = this.teamDecepticonsSource.asObservable();
  readonly teamsAreValid$ = combineLatest([this.teamAutobots$, this.teamDecepticons$])
    .pipe(
      map(([autobots, decepticons]: [TransformersViewDefinition[], TransformersViewDefinition[]]) => {
        return checkTransformerTeamsAreValid(autobots, decepticons);
      })
    );
  readonly hadData$ = combineLatest([this.teamAutobots$, this.teamDecepticons$])
    .pipe(
      map(([autobots, decepticons]: [TransformersViewDefinition[], TransformersViewDefinition[]]) => {
        return checkTransformerTeamsDefined(autobots, decepticons);
      })
    );
  readonly battleResults$ = this.battleResultsSource.asObservable();

  get teamAutobots(): TransformersViewDefinition[] {
    return this.teamAutobotsSource.value;
  }

  get teamDecepticons(): TransformersViewDefinition[] {
    return this.teamDecepticonsSource.value;
  }

  set inputData(data: string) {
    const transformersByTeam = createTransformers(data);
    const autobots = transformersByTeam[TransformerTeam.Autobot];
    const decepticons = transformersByTeam[TransformerTeam.Decepticon];
    const battleResults = getBattleResults(autobots, decepticons);

    this.teamAutobotsSource.next(autobots);
    this.teamDecepticonsSource.next(decepticons);
    this.battleResultsSource.next(battleResults);
  }
}
