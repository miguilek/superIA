import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit {

  form: FormGroup;
  serviceName: string;

  constructor(
    private formBuilder: FormBuilder,
    private servicesService: ServicesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      name: [{value:'',disabled:true},Validators.required],
      type: [{value:'',disabled:true},Validators.required],
      uri: ['',Validators.required],
      inputType: ['',Validators.required],
      outputType: ['',Validators.required],
      body: ['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.form.controls['name'].setValue(params['name']);
      this.serviceName = params['name'];
      this.form.controls['type'].setValue(params['type']);
      this.form.controls['inputType'].setValue(params['inputType']);
      this.form.controls['outputType'].setValue(params['outputType']);
      
      if(params['type'] == 'tarea') {
        // this.form.controls['body'].setValue(this.getJSONFromComaArray(params['body']));
        this.form.controls['body'].setValue(JSON.stringify(params['body']));
      } else if(params['type'] == 'microservice') {
        // microservice is already == ''
      }
      this.setValidators(params['type']);

      this.form.controls['uri'].setValue(params['uri']);
    });
  }

  
  private setValidators(type: string) {
    const bodyControl = this.form.get('body');
    if(type == 'tarea'){
      bodyControl.setValidators([Validators.required]);
    } else if(type == 'microservicio') {
      bodyControl.patchValue('');
      bodyControl.clearValidators();
    }
    bodyControl.updateValueAndValidity();
  }

  private getJSONFromComaArray(string: string) {
    let result = '[';
    const array = string.split(',');
    array.forEach(s => {
      result += '"'+s+'",';
    });
    result = result.slice(0, -1);
    result += ']';
    return result;
  }

  submit() {
    const val = this.form.controls;
    const service: Service = {
      name: val['name'].value,
      uri: val['uri'].value,
      type: val['type'].value,
      inputType: val['inputType'].value,
      outputType: val['outputType'].value,
      body: (val['body'].value && val['body'].value != '') ? JSON.parse(val['body'].value) : '',
    }

    this.servicesService.updateService(this.serviceName,service)
    .subscribe({
      next: data => {
        this.openSnackBar('Servicio actualizado correctamente');
        this.router.navigateByUrl('/servicelist');
      },
      error: error => {
        alert('Error');
        console.log(error);
      }
    });
  }

  openSnackBar(msg: string) {
    this.snackBar.open(msg, 'Cerrar', {duration: 3000});
  }

  get serviceType(): string {
    return this.form.controls['type'].value;
  }
  
  get serviceListTab() {
    return this.form.get('type').value == 'tarea' ? 0 : 1;
  }
}
