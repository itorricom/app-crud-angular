import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main-layout/main-layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home')
            },
            {
                path: 'stocks',
                loadComponent: () => import('./pages/stock/stock')
            },
            {
                path: 'forms',
                loadComponent: () => import('./pages/reactive-forms/reactive-forms')
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
