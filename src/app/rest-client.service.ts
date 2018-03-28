import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class RestClientService {

  private base_url: string;
  private stkpush_url: string;
  private token_url: string;
  private headers: any;
  private options: any;

  constructor(private httpClient: HttpClient) {
    this.base_url = 'https://jsonplaceholder.typicode.com/';
    this.stkpush_url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    this.token_url = 'https://safapp.vitaldigitalmedia.net/auth.php/';
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

  getPhoto(id: number): Observable<any> {
    this.setHeaders();
    return this.httpClient.get<any>(`${this.base_url}photos/${id}/`, this.options);
  }

  getPhotos(): Observable<any> {
    this.setHeaders();
    return this.httpClient.get<any>(`${this.base_url}photos/?_start=15&_limit=15`, this.options);
  }

  generateToken(): Observable<any> {
    this.setHeaders();
    return this.httpClient.get<TokenResponse>(this.token_url, this.options);
  }

  stkPush(post: any): Observable<any> {
    this.setHeaders();
    return this.httpClient.post<any>(this.stkpush_url, post, this.options);
  }

}
