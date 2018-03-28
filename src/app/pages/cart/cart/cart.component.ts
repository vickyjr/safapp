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

  constructor(private cartService: CartService, private restclientService: RestClientService) {
    this.photos = this.cartService.photos;
    this.confirmPage = false;
    this.token = <TokenResponse>{};
    this.lipaNaMpesaRequest = <LipaNaMpesaRequest>{};
  }

  ngOnInit() {

  }

  checkout(): void {
    this.confirmPage = true;
    this.getToken();
  }

  confirm(): void {
    this.stkPush(this.lipaNaMpesaRequest);
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

  private stkPush(lipaNaMpesaRequest: LipaNaMpesaRequest) {
    this.restclientService.stkPush(lipaNaMpesaRequest).subscribe(
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

}
