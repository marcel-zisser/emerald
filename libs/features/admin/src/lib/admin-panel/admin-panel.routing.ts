import { Routes } from '@angular/router';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { LogoutButtonComponent } from 'app/logout-button/logout-button.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminPanelRoutes: Routes = [
    { path: 'users',           component: ManageUsersComponent },
    { path: 'logout',          component: LogoutButtonComponent },
    { path: 'login',           component: LoginComponent }
];
