import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

/*import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';*/
import { MovieApiProvider } from '../providers/movie-api/movie-api';
import {HttpClientModule} from "@angular/common/http";
import { ToastServiceProvider } from '../providers/toast-service/toast-service';
import { TheaterApiProvider } from '../providers/theater-api/theater-api';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    /*StatusBar,
    SplashScreen, */
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieApiProvider,
    ToastServiceProvider,
    TheaterApiProvider,
  ]
})
export class AppModule {}
