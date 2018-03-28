import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

class PhotosResponse {
  res: Photo[];
}

@Injectable()
export class RestClientService {

  private base_url: string;
  private base_auth_url: string;
  private headers: any;
  private options: any;

  constructor(private httpClient: HttpClient) {
    this.base_url = 'https://jsonplaceholder.typicode.com/';
    this.base_auth_url = 'https://safapp.vitaldigitalmedia.net/auth.php';
    this.setHeaders();
  }

  setHeaders() {
    this.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      /**'Access-Control-Allow-Headers': '*'**/
    };
    this.options = {headers: this.headers};
  }

  getPhotos(): Observable<any> {
    this.setHeaders();
    return this.httpClient.get<any>(`${this.base_url}photos/?_start=15&_limit=15`, this.options);
  }

}