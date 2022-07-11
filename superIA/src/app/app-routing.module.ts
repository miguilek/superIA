import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },
  { path: 'servicelist', component: ServiceListComponent , canActivate: [AuthGuard] },
  { path: 'createservice', component: CreateServiceComponent , canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/servicelist'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
