import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxDropzoneModule } from 'ngx-dropzone';

import { HttpClientModule } from '@angular/common/http';
import { CreateServiceComponent } from './components/create-service/create-service.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
import { EditServiceComponent } from './components/edit-service/edit-service.component';
import { AskDeleteComponent } from './modals/ask-delete/ask-delete.component';
import { RunServiceComponent } from './modals/run-service/run-service.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CreateServiceComponent,
    ServiceListComponent,
    EditServiceComponent,
    AskDeleteComponent,
    RunServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxDropzoneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
