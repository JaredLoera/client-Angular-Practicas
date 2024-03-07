import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'configuration', component: ConfigurationComponent},
    { path: 'verify-mail/:id', component: VerifyMailComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'users', component: UsersComponent}
];
