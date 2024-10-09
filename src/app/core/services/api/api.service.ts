/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ApiService
{
  baseUrl: any = '';
  constructor( private http: HttpClient)
  {
    this.baseUrl = environment.baseURL;
  }

  public post(url: string, body: any): Promise<any>
  {
    return new Promise<any>((resolve, reject) =>
    {
      console.log('Post Request : ',this.baseUrl + url, body);
      this.http.post(this.baseUrl + url, body).subscribe((data) =>
      {
        resolve(data);
      }, error => {
        resolve(error);
      });
    });
  }

  public get(url: string): Promise<any>
  {
    return new Promise<any>((resolve, reject) =>
    {
     console.log('Post Request : ',this.baseUrl + url);
      this.http.get(this.baseUrl + url).subscribe((data) =>
      {
        console.log("Received Data :",data)
        resolve(data);
      },
      error =>
      {
        resolve(error);
      });
    });
  }

}
