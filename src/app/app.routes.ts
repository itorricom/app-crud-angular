import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home')
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./pages/usuario/usuario')
    },
    {
        path: 'stocks',
        loadComponent: () => import('./pages/stock/stock')
    },
    {
        path: '**',
        redirectTo: ''
    }
];
