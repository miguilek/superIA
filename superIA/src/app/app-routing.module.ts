import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListadoComponent } from './components/listado/listado.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'listado', component: ListadoComponent , canActivate: [AuthGuard] },
  { path: 'createservice', component: CreateServiceComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/listado'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
