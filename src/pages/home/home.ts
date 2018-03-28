import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {RestClientService} from "../../app/rest-client.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  photos: Photo[];

  constructor(public navCtrl: NavController, private restclientService: RestClientService) {

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

}
