import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CastleViewDefinition, createCastles, parseCastleInputData } from './castle-view.config';

@Injectable({
  providedIn: 'root'
})
export class CastleViewFacade {
  private componentDataSource = new BehaviorSubject<CastleViewDefinition[]>([]);

  readonly componentData$ = this.componentDataSource.asObservable();

  get castleDefinitionData(): CastleViewDefinition[] {
    return this.componentDataSource.value;
  }

  set inputData(data: string) {
    const value = parseCastleInputData(data);
    const castles: CastleViewDefinition[] = createCastles(value);

    this.componentDataSource.next(castles);
  }
}
