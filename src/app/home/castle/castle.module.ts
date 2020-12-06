import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { ComponentModule } from '../../component/component.module';
import { CoreControlsModule } from '../../core/controls/core-controls.module';
import { CastleViewComponent } from './view/castle-view.component';
import { CastleViewInputComponent } from './view/input/castle-view-input.component';
import { CastleViewOutputComponent } from './view/output/castle-view-output.component';
import { CastleViewHistogramElementComponent } from './view/output/bar-graph/castle-view-bar-graph-element.component';

@NgModule({
  imports: [
    CoreModule,
    ComponentModule,
    CoreControlsModule
  ],
  declarations: [
    CastleViewComponent,
    CastleViewInputComponent,
    CastleViewOutputComponent,
    CastleViewHistogramElementComponent
  ]
})
export class CastleModule { }
