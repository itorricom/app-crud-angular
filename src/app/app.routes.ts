import { Routes } from '@angular/router';
import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/main-layout/main-layout.component'),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home'),
                canActivate: [authGuard]
            },
            {
                path: 'stocks',
                loadComponent: () => import('./pages/stock/stock'),
                canActivate: [authGuard]
            },
            {
                path: 'stock-reactive',
                loadComponent: () => import('./pages/stock-reactive/stock-reactive'),
                canActivate: [authGuard]
            },
            {
                path: 'forms',
                loadComponent: () => import('./pages/reactive-forms/reactive-forms'),
                canActivate: [authGuard]
            },
            {
                path: 'users',
                loadChildren: () => import('./pages/user/user.routes'),
                canActivate: [authGuard, adminGuard]
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.LoginComponent)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
