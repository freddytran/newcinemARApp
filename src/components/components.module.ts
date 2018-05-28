import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import {IonicModule} from "ionic-angular";
import {FormsModule} from "@angular/forms";
import {AgmCoreModule} from "@agm/core";


@NgModule({
	declarations: [GoogleMapComponent],
	imports: [
	  IonicModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBm1XiwXQ19EKIFKoe6xkket4bXNHfO7gU'
    }),
  ],
	exports: [GoogleMapComponent]
})
export class ComponentsModule {}
