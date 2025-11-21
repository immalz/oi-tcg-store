import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/Home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/Cards/cards.component').then(m => m.CardsComponent)
  },
  {
    path: 'card/:id',
    loadComponent: () =>
      import('./features/card-detail/card-detail.component')
        .then(m => m.CardDetailComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
