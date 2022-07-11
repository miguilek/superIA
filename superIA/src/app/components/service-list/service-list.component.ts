import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
    private fb: FormBuilder
  ) {
    this.tareaFG = this.fb.group({
      tareaArray: this.fb.array([])
    });
    this.microservicioFG = this.fb.group({
      microservicioArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
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

  get tareaArray() {
    return this.tareaFG.get('tareaArray') as FormArray;
  }

  get microservicioArray() {
    return this.microservicioFG.get('microservicioArray') as FormArray;
  }

  runService(service: Service, i: number) {
    const payload = this.tareaArray.value[i];
    this.servicesService.runService(service, payload)
    .subscribe(data => {
      console.log('RETURN FROM RUN SERVICE: ',data)
    });
  }

}
