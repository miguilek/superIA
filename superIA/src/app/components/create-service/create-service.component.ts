import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.scss']
})
export class CreateServiceComponent implements OnInit {

  form: FormGroup;
  type: string;

  constructor(
    private formBuilder: FormBuilder,
    private serviceService: ServicesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: ['',Validators.required],
      type: ['',Validators.required],
      uri: ['',Validators.required],
      inputType: ['',Validators.required],
      outputType: ['',Validators.required],
      body: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    const typeControl = this.form.get('type');
    typeControl.valueChanges
    .subscribe(val => {
      // Set validator logic to form.['body']
      this.setValidators(val);
    });
    this.activatedRoute.queryParams
    .subscribe(params => {
      this.type = params['type'];
      if(this.type) this.form.get('type').patchValue(this.type);
    });
  }

  setValidators(type: string) {
    const bodyControl = this.form.get('body');
    if(type == 'tarea'){
      bodyControl.setValidators([Validators.required]);
    } else if(type == 'microservicio') {
      bodyControl.patchValue('');
      bodyControl.clearValidators();
    }
    bodyControl.updateValueAndValidity();
  }

  submit() {
    const val = this.form.value;
    const service: Service = {
      name: val.name,
      uri: val.uri,
      type: val.type,
      inputType: val.inputType,
      outputType: val.outputType,
      body: (val.body && val.body != '') ? JSON.parse(val.body) : '',
    }

    this.serviceService.createService(service)
      .subscribe({
        next: _ => {
          this.openSnackBar();
          this.router.navigateByUrl('/servicelist?selectedTab='+this.serviceListTab);
        },
        error: (err) => {
          alert('Error creando servicio');
          console.log(err);
        },
        complete: () => {}
      });
  }

  openSnackBar() {
    this.snackBar.open('Servicio creado correctamente', 'Cerrar', {duration: 3000});
  }

  get serviceType(): string {
    return this.form.controls['type'].value;
  }

  get serviceListTab() {
    return this.form.get('type').value == 'tarea' ? 0 : 1;
  }

}
