import { Routes } from '@angular/router';
import {CountryListComponent} from './country-list/country-list.component';

export const countryRoutes: Routes = [
  {
    path: '',
    component: CountryListComponent,
  }
];
