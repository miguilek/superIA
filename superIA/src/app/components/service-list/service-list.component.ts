import { Component, OnInit } from '@angular/core';
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

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getServices()
      .subscribe(services => {
        services.forEach(s => {
          if(s.type == 'tarea')
            this.tareaServices.push(s);
          else if(s.type == 'microservicio')
            this.microservices.push(s);
        })
      });
  }

  runService(service: Service) {
    // reactive forms to get payload
    // this.servicesService.runService(service, )
  }

}
