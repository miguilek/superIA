import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../interfaces/service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServices(): Observable<Array<Service>> {
    return this.http.get<Array<Service>>(this.API_URL + '/services');
  }

  // getService(name: string) {
  //   return this.http.get(this.API_URL + '/service?name=' + name);
  // }

  createService(service: Service) {
    return this.http.post(this.API_URL + '/service', service);
  }

  deleteService(serviceName: string) {
    return this.http.delete(this.API_URL + '/service/' + serviceName);
  }

  updateService(serviceName: string, service: Service) {
    return this.http.put(this.API_URL + '/service/' + serviceName, service);
  }

  runService(service: Service, payload: any) {
    return this.http.post(service.uri, payload);
  }
}
