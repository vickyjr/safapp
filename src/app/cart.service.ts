import { Injectable } from '@angular/core';

@Injectable()
export class CartService {
  photos: Photo[];
  favorites: Photo[];

  constructor() {
    this.photos = [];
    this.favorites = [];
  }

}
