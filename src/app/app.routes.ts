import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'configuration', component: ConfigurationComponent},
    { path: 'verify-mail/:id', component: VerifyMailComponent}
];
