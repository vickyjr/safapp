import { Component, OnInit } from '@angular/core';
import {CartService} from "../../../cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  private photos: Photo[];
  confirmPage: boolean;

  constructor(private cartService: CartService) {
    this.photos = this.cartService.photos;
    this.confirmPage = false;
  }

  ngOnInit() {
  }

  checkout(): void {
    this.confirmPage = true;
  }

  confirm(): void {

  }

}
