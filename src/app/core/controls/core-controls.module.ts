import { NgModule } from '@angular/core';
import { CustomControlTemplateDirective } from './custom-control-template.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CustomControlTemplateDirective
  ],
  exports: [
    CustomControlTemplateDirective
  ]
})
export class CoreControlsModule { }
