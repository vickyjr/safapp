import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {RestClientService} from "../../../rest-client.service";
import {CartService} from "../../../cart.service";
import {CartComponent} from "../../cart/cart/cart.component";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html'
})
export class ItemComponent implements OnInit {
  id: number;
  photo: Photo;

  payload: {
    id: number;
  };

  constructor(
    public navCtrl: NavController,
    private navParams: NavParams,
    private restclientService: RestClientService,
    private cartService: CartService) {
    this.photo = <Photo>{};
  }

  private fetchPhoto() {
    this.restclientService.getPhoto(this.id).subscribe(
      res => {
        console.log(res);
        this.photo = res;
      },
      err => {
        console.log(err);
        // if (err.statusText === 'Unauthorized') {
        // }
      }
    );
  }

  ngOnInit() {
    this.id = this.navParams.get('id');
    this.payload = {
      id: this.id
    };
    this.fetchPhoto();
  }

  addToCart(): void {
    this.navCtrl.push(CartComponent, this.payload);
    this.cartService.photos.push(this.photo);
  }

  favorite(id: number): void {
    this.navCtrl.push(CartComponent, this.payload);
    this.cartService.favorites.push(this.photo);
  }

}
