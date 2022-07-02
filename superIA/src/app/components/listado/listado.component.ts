import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

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

}
