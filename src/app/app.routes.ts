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
                path: 'tasks',
                loadChildren: () => import('./pages/task/task.routes'),
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
