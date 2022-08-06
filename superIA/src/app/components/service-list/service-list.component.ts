import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
import { AskDeleteComponent } from 'src/app/modals/ask-delete/ask-delete.component';
import { RunServiceComponent } from 'src/app/modals/run-service/run-service.component';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {

  tareaServices: Array<Service> = [];
  microservices: Array<Service> = [];

  tareaFG: FormGroup;
  microservicioFG: FormGroup;

  selectedTab = 0;

  constructor(
    private servicesService: ServicesService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.loadServices();
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.selectedTab = params['selectedTab'];
    });
  }

  deleteService(service: Service) {
    this.servicesService.deleteService(service.name)
    .subscribe({
      next: data => {
        this.openSnackBar('Servicio "' + service.name + '" eliminado correctamente');
        this.loadServices();
      },
      error: error => {
        alert('Error');
      }
    });
  }

  updateService(service: Service) {
    this.router.navigate(['/editservice'], 
      { queryParams:{
          name: service.name,
          inputType: service.inputType,
          outputType: service.outputType,
          body: service.body,
          uri: service.uri,
          type: service.type
        }
      }
    );
  }

  private loadServices() {
    this.tareaServices = [];
    this.microservices = [];
    this.servicesService.getServices()
    .subscribe(services => {
      services.forEach(s => {
        if(s.type == 'tarea'){
          this.tareaServices.push(s);
          // this.tareaArray.push(this.fb.control(''));
        }
        else if(s.type == 'microservicio'){
          this.microservices.push(s);
          // this.microservicioArray.push(this.fb.control(''));
        }
      })
    });
  }

  openSnackBar(msg:string) {
    this.snackBar.open(msg, 'Cerrar', {duration: 3000});
  }

  openDialogDelete(service: Service, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(AskDeleteComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // properties
    dialogRef.componentInstance.close = false;
    // subscription on close
    dialogRef.afterClosed()
    .subscribe(_ => {
      if(dialogRef.componentInstance.close)
        this.deleteService(service);
    });
  }

  openDialogRun(service: Service, enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(RunServiceComponent, {
      width: '50%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    // properties
    dialogRef.componentInstance.service = service;
    // subscription on close
    dialogRef.afterClosed()
    .subscribe(_ => {
      // console.log(dialogRef.componentInstance.close);
      // if(dialogRef.componentInstance.close)
      //   this.deleteService(service);
    });
  }
}
