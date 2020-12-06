import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { PageHeaderComponent } from './page-header/page-header.component';
import { TextAreaComponent } from './text-area/text-area.component';

@NgModule({
  imports: [
    CoreModule
  ],
  declarations: [
    PageHeaderComponent,
    TextAreaComponent
  ],
  exports: [
    PageHeaderComponent,
    TextAreaComponent
  ]
})
export class ComponentModule { }
