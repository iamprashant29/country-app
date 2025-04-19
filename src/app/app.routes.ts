import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'countries',
    pathMatch: 'full'
  },
  {
    path: 'countries',
    loadChildren:  () =>
      import('./features/country/country.routes').then((x) => x.countryRoutes),
  }
];
