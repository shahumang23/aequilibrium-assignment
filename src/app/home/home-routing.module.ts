import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TransformationViewComponent } from './transformation/view/transformation-view.component';
import { CastleViewComponent } from './castle/view/castle-view.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'transformation',
        component: TransformationViewComponent
      },
      {
        path: 'castle',
        component: CastleViewComponent
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class HomeRoutingModule {
}
