import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/pages/dashboard/dashboard';
import { Documentation } from './app/pages/documentation/documentation';
import { Landing } from './app/pages/landing/landing';
import { Notfound } from './app/pages/notfound/notfound';
import { Register } from './app/components/register/register';
import { LogIn } from './app/components/log-in/log-in';

import { BuquedaVenta } from './app/components/buqueda-venta/buqueda-venta';
import { BuquedaAlquiler } from './app/components/buqueda-alquiler/buqueda-alquiler';
import { DetalleInmueble } from './app/components/detalle-inmueble/detalle-inmueble';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'uikit', loadChildren: () => import('./app/pages/uikit/uikit.routes') },
            { path: 'documentation', component: Documentation },
            { path: 'pages', loadChildren: () => import('./app/pages/pages.routes') },
            { path: 'busqueda-venta', component: BuquedaVenta },
            { path: 'busqueda-alquiler', component: BuquedaAlquiler },
            { path: 'detalle-venta/:id', component: DetalleInmueble },
            { path: 'detalle-alquiler/:id', component: DetalleInmueble }
        ]
    },
    { path: 'landing', component: Landing },
    { path: 'notfound', component: Notfound },
    { path: 'register', component:Register },
    { path: 'login', component:LogIn },
    { path: '**', redirectTo: '/notfound' }
];
