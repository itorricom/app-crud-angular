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
                path: 'stock-reactive',
                loadComponent: () => import('./pages/stock-reactive/stock-reactive')
            },
            {
                path: 'forms',
                loadComponent: () => import('./pages/reactive-forms/reactive-forms')
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/user/user.routes')
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
