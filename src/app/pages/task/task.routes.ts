import { Routes } from '@angular/router';

export const taskRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/task-list/task-list')
  },
  {
    path: 'create-task',
    loadComponent: () => import('./components/task-create/task-create')
  },
  {
    path: ':id',
    loadComponent: () => import('./components/task-by-id/task-by-id')
  },
  {
    path: '**',
    redirectTo: ''
  }
];

export default taskRoutes;
