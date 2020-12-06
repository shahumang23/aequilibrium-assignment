import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { CastleModule } from './castle/castle.module';
import { TransformationModule } from './transformation/transformation.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CoreModule,
    TransformationModule,
    CastleModule,
    HomeRoutingModule
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
