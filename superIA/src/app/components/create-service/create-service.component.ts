import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService
  ) {
    this.form = this.formBuilder.group({
      name: ['name',Validators.required],
      type: ['tarea',Validators.required],
      uri: ['localhost',Validators.required],
      inputType: ['JSON',Validators.required],
      outputType: ['JSON',Validators.required],
      body: ['["microservicio1","microservicio2"]',Validators.required]
    })
  }

  ngOnInit(): void {
  }

  submit() {
    const val = this.form.value;
    const service: Service = {
      name: val.name,
      uri: val.uri,
      type: val.type,
      inputType: val.inputType,
      outputType: val.outputType,
      body: JSON.parse(val.body),
    }

    this.serviceService.createService(service)
      .subscribe({
        next: (data) => {alert('Servicio creado!')},
        error: (err) => {
          alert('Error creando servicio');
          console.log(err);
        },
        complete: () => {}
      });
  }

}
