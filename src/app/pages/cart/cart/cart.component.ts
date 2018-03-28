import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../cart.service";
import {RestClientService} from "../../../rest-client.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  photos: Photo[];
  token: TokenResponse;
  confirmPage: boolean;
  lipaNaMpesaRequest: LipaNaMpesaRequest;
  private total: number;
  private is_success: boolean;

  constructor(private cartService: CartService,
              private restclientService: RestClientService) {
    this.total = 0;
    this.photos = this.cartService.photos;
    this.confirmPage = false;
    this.is_success = false;
    this.token = <TokenResponse>{};
    this.lipaNaMpesaRequest = <LipaNaMpesaRequest>{};
  }

  ngOnInit() {
    this.calculateTotalAmount();
  }

  checkout(): void {
    this.confirmPage = true;
    this.getToken();
  }

  confirm(): void {
    this.total = this.calculateTotalAmount();
    this.lipaNaMpesaRequest.Password = this.token.password;
    this.lipaNaMpesaRequest.Timestamp = this.token.timestamp;
    this.lipaNaMpesaRequest.Amount = this.total.toString();
    this.lipaNaMpesaRequest.BusinessShortCode = '174379';
    this.lipaNaMpesaRequest.PartyB = '174379';
    this.lipaNaMpesaRequest.TransactionType = 'CustomerPayBillOnline';
    this.lipaNaMpesaRequest.PartyA = '0727206415';
    this.lipaNaMpesaRequest.PhoneNumber = '0727206415';
    this.lipaNaMpesaRequest.CallBackURL = 'https://safapp.vitaldigitalmedia.net/';
    this.lipaNaMpesaRequest.AccountReference = 'GHADHGA8';
    this.lipaNaMpesaRequest.TransactionDesc = 'Test by @Vickyjr';
    this.stkPush(this.lipaNaMpesaRequest, this.token.access_token);
  }

  private calculateTotalAmount(): number {
    let x: number;
    for(x = 0; x < this.photos.length; x++) {
      this.total += this.photos[x].id + 10;
    }
    return this.total;
  }

  private getToken() {
    this.restclientService.generateToken().subscribe(
      res => {
        console.log(res);
        this.token = res;
      },
      err => {
        console.log(err);
        // if (err.statusText === 'Unauthorized') {
        // }
      }
    );
  }

  private stkPush(lipaNaMpesaRequest: LipaNaMpesaRequest, token: string) {
    this.restclientService.stkPush(lipaNaMpesaRequest, token).subscribe(
      res => {
        console.log(res);
        this.is_success = true;
      },
      err => {
        console.log(err);
        this.is_success = false;
        // if (err.statusText === 'Unauthorized') {
        // }
      }
    );
  }

}
