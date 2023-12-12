import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://localhost:8087'; // Replace with your actual backend API URL

  constructor(private http: HttpClient) { }

  getSubjects() {
    return this.http.get(`${this.apiUrl}/subjects`);
  }
  saveAll(formData:any){
    return this.http.post(`${this.apiUrl}/data-items/upload`,formData);
  }

}
