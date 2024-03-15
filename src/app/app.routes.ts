import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { VerifyMailComponent } from './pages/verify-mail/verify-mail.component';
import { HomeComponent } from './pages/home/home.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { UsersComponent } from './pages/users/users.component';
import { PlayerComponent } from './pages/player/player.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SalaComponent } from './pages/sala/sala.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: 'dashboard', component: DashboardComponent},
    { path: 'configuration', component: ConfigurationComponent},
    { path: 'verify-mail/:id', component: VerifyMailComponent},
    { path: 'movies', component: MoviesComponent},
    { path: 'users-table', component: UsersComponent},
    { path: 'player/:id', component: PlayerComponent},
    { path: 'genero/:genero', component: GeneroComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'room/:id', component: SalaComponent},
    { path: '**', component: NotFoundComponent}
];
