import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';

import { ComponentModule } from '../../component/component.module';
import { CoreControlsModule } from '../../core/controls/core-controls.module';
import { TransformationViewComponent } from './view/transformation-view.component';
import { TransformationViewInputComponent } from './view/input/transformation-view-input.component';
import { TransformationViewOutputComponent } from './view/output/transformation-view-output.component';

@NgModule({
  imports: [
    CoreModule,
    ComponentModule,
    CoreControlsModule
  ],
  declarations: [
    TransformationViewComponent,
    TransformationViewInputComponent,
    TransformationViewOutputComponent
  ]
})
export class TransformationModule { }
