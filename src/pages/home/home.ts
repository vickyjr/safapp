import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestClientService} from "../../app/rest-client.service";
import {ItemComponent} from "../../app/pages/item/item/item.component";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  photos: Photo[];
  payload: {
    id: number;
  };

  constructor(public navCtrl: NavController, private restclientService: RestClientService) {
    this.payload = {
      id: 0
    };
  }

  private fetchPhotos() {
    this.restclientService.getPhotos().subscribe(
      res => {
        console.log(res);
        this.photos = res;
      },
      err => {
        console.log(err);
        // if (err.statusText === 'Unauthorized') {
        // }
      }
    );
  }

  ngOnInit(): void {
    this.fetchPhotos();
  }

  itemClicked(id: number): void {
    console.log(id);
    this.payload.id = id;
    this.navCtrl.push(ItemComponent, this.payload);
  }

}
