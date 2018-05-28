import {Component, SimpleChange, Input, OnChanges} from '@angular/core';
import {MarkerInterface} from "../../interfaces/marker.interface";

/**
 * Generated class for the GoogleMapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {
  @Input() mapCoords: any;
  @Input() mapMarkers: MarkerInterface[];

  lat:number;
  lng:number;
  zoom:number = 16;
  markers: MarkerInterface[];

  constructor() {
    console.log('Hello GoogleMapComponent Component');
  }

  ngOnChanges(changes:SimpleChange):void{
    if(changes['mapCoords'] !== undefined){
      if(this.mapCoords.lat){
        this.lat = this.mapCoords.lat;
      }

      if(this.mapCoords.lng){
        this.lng = this.mapCoords.lng;
      }
    }

    if(changes['mapMarkers'] !== undefined){
      this.markers = changes['mapMarkers'].currentValue;
      console.log(this.markers);
    }
  }
}
