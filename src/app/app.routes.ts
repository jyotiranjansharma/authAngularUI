import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { MyResolverService } from './services/my-resolver.service';
import { CanDeactivateGuard } from './can-deactivate.guard';

export const routes: Routes = [
    {path: 'home', loadComponent: () => import('./pages/home/home.component')},
    {path: 'bar', loadComponent: () => import('./pages/bar-chart/bar-chart.component')},
    {path: 'login', loadComponent: () => import('./pages/login/login.component')},
    {path: 'register', loadComponent: () => import('./pages/register/register.component')},
    {path: 'employee', loadComponent: () => import('./pages/employee/employee.component')},
    {path: 'forget-password', loadComponent: () => import('./pages/forget-password/forget-password.component')},
    {path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component'), 
        canActivate: [AuthGuard], 
        resolve: {
            myData: MyResolverService
        }
    },
    {path: 'reset/:token', loadComponent: () => import('./pages/reset/reset.component')},
    {path: 'todoList', 
        loadComponent: () => import('./pages/todo/todo-list/todo-list.component'),
        canActivate: [AuthGuard],
        children: [
            { path: 'add', loadComponent: () => import('./pages/todo/add-todo/add-todo.component')},
            { path: 'edit/:id', loadComponent: () => import('./pages/todo/edit-todo/edit-todo.component'), canDeactivate: [CanDeactivateGuard]}
        ]
    }
];
