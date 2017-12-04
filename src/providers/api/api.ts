import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://localhost:8080/api';

  //  public allow = new Headers({
  //    'Access-Control-Allow-Origin': '*',
  //    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  //  });
  
  
  constructor(public http: HttpClient) {
  }
  

  get(endpoint: string, params?: any, reqOpts?: any) {
   
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
     if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
        console.log("params")
      }

      let loc = params.title;
      
      return this.http.get(this.url + '/' + endpoint + "/" + loc);

    }

    return this.http.get(this.url + '/' + endpoint);
    
  }

  post(endpoint: string, body: object, reqOpts?: any) {
    let loc = this.url + '/' + endpoint;
    return this.http.post(loc, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  delete(endpoint: string, id: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint + "/" + id, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }
}
