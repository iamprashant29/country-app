import {Routes} from '@angular/router';
import {CountryListComponent} from './country-list/country-list.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryListComponent
  },
  {
    path: 'details/:countryName',
    loadComponent: () => import('./country-details/country-details.component').then(c => c.CountryDetailsComponent)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
