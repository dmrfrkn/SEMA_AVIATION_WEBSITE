import { Routes } from '@angular/router';
import { App } from './app';
import { AdminPanelComponent } from './admin-panel';
import { AdminLoginComponent } from './admin-login';

export const routes: Routes = [
	{ path: '', component: App },
	{ path: 'admin', component: AdminPanelComponent },
	{ path: 'admin-login', component: AdminLoginComponent },
];
