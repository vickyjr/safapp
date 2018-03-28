import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {RestClientService} from "./rest-client.service";
import {HttpClientModule} from "@angular/common/http";
import { ItemComponent } from './pages/item/item/item.component';
import { CartComponent } from './pages/cart/cart/cart.component';
import {CartService} from "./cart.service";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ItemComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemComponent,
    CartComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestClientService,
    CartService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
