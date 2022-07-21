import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
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

  constructor(
    private servicesService: ServicesService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tareaFG = this.fb.group({
      tareaArray: this.fb.array([])
    });
    this.microservicioFG = this.fb.group({
      microservicioArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  get tareaArray() {
    return this.tareaFG.get('tareaArray') as FormArray;
  }

  get microservicioArray() {
    return this.microservicioFG.get('microservicioArray') as FormArray;
  }

  runService(service: Service, i: number) {
    const payload = {
      "data": {
        "dato1":this.tareaArray.value[i]
      }
    };

    this.servicesService.runService(service, payload)
    .subscribe(data => {
      console.log('RETURN FROM RUN SERVICE: ',data)
    });
  }

  runMicroservice(service: Service, i: number) {
    const payload = {
      "dato1": this.microservicioArray.value[i]
    };
    this.servicesService.runService(service, payload)
    .subscribe({
      next: data => {
        console.log('RETURN FROM RUN MICROSERVICE: ',data)
      },
      error: error => {
        alert('Error');
      }
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
    this.router.navigate(['/editservice', 
      {
        name: service.name,
        inputType: service.inputType,
        outputType: service.outputType,
        body: service.body,
        uri: service.uri,
        type: service.type
      }
    ]);
  }

  private loadServices() {
    this.tareaServices = [];
    this.microservices = [];
    this.servicesService.getServices()
    .subscribe(services => {
      services.forEach(s => {
        if(s.type == 'tarea'){
          this.tareaServices.push(s);
          this.tareaArray.push(this.fb.control(''));
        }
        else if(s.type == 'microservicio'){
          this.microservices.push(s);
          this.microservicioArray.push(this.fb.control(''));
        }
      })
    });
  }

  openSnackBar(msg:string) {
    this.snackBar.open(msg, 'Cerrar', {duration: 3000});
  }
}
