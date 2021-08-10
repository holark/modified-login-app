import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'http://localhost:3000';

  constructor(private http: HttpClient) {

   }

  register(data: any) {
    return this.http.post(`${this.url}/signup`, data)
  }

  login(data: any) {
    console.log(data);
    return this.http.post(`${this.url}/login`, data)
  }

  getGitUserData(name: String) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    }

    // console.log(httpOptions);


    return this.http.get(`${this.url}/thirdPartyData/` + name, httpOptions)
  }

}
