import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Service } from 'src/app/interfaces/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-run-service',
  templateUrl: './run-service.component.html',
  styleUrls: ['./run-service.component.scss']
})
export class RunServiceComponent implements OnInit {

  form: FormGroup;
  file: File;
  service: Service;
  output = null;
  loading: boolean;
  
  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
        payload: this.fb.control([],Validators.required)
      });
  }

	onSelect(event) {
    this.file = event.addedFiles[0];    
	}

	onRemove(event) {
    this.file = null;
  }

  runService() {
    if(this.form.valid || this.file)
      this.loading = true;
      if(this.service.inputType == 'JSON'){
        this.runServiceJSON();
      } else if (this.service.inputType == 'image') {
        this.runServiceImg();
      }
  }

  runServiceJSON() {
    const payload = {
      "data": this.form.controls['payload'].value
    };
    this.servicesService.runService(this.service, payload)
    .subscribe(data => {
      console.log('RETURN FROM RUN SERVICE: ',data)
      this.output = JSON.stringify(data);
      this.loading = false;
    });
  }

  runServiceImg() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
        console.log(fileReader.result.toString());
        const base64File = fileReader.result.toString();
        const payload = {
          data: base64File
        }
        this.servicesService.runService(this.service, payload)
        .subscribe(data => {
          console.log('RETURN FROM RUN SERVICE: ',data)
          this.output = JSON.stringify(data,null,4);
          this.loading = false;
        });
    }
    fileReader.readAsDataURL(this.file);
  }
}
