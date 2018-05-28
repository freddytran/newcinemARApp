import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {CinemasPage} from "./cinemas";
import {HttpClient, HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    CinemasPage,
  ],

  imports: [
    HttpClientModule,
    IonicPageModule.forChild(CinemasPage),
  ],
})
export class CinemasModule{}
