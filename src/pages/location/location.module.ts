import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LocationPage} from "./location";
import {ComponentsModule} from "../../components/components.module";
import {CinemaDetailPage} from "../cinema-detail/cinema-detail";


@NgModule({
  declarations:[
    LocationPage
  ],

  imports: [
    ComponentsModule,
    IonicPageModule.forChild(LocationPage),
    /*AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBeSPk_JRJdkteFrzpkOx0otjgGtVELQQY',
      libraries: ["places"]
    })*/
  ],
})
export class LocationModule{}
