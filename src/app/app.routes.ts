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
                path: 'usuario',
                loadComponent: () => import('./pages/usuario/usuario')
            },
            {
                path: 'stocks',
                loadComponent: () => import('./pages/stock/stock')
            },
            {
                path: 'login',
                loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
