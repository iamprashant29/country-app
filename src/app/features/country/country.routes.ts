import {Routes} from '@angular/router';
import {CountryListComponent} from './country-list/country-list.component';
import {CountryDetailsComponent} from './country-details/country-details.component';

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
