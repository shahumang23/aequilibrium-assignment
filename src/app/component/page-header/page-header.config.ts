import { NavigationExtras } from '@angular/router';

export interface PageHeaderNavigateBackParameters {
  commands: any[];
  extras?: NavigationExtras;
}

export const defaultPageHeaderNavigateBackParameters = {
  commands: ['./home']
} as PageHeaderNavigateBackParameters;
