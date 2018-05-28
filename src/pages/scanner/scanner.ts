import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import { ToastServiceProvider} from "../../providers/toast-service/toast-service";
import {MarkerInterface} from "../../interfaces/marker.interface";
import {CinemaPosInterface} from "../../interfaces/cinemaPos.interface";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'scanner.html'
})
export class ScannerPage {

  loading: Loading;
  isWatching: boolean = false;
  coords: any;
  watchProcess: any;
  btnClass: string;
  btnText: string;
  markers: MarkerInterface[];
  cinemaPos: CinemaPosInterface[];
  watchOptions: any = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  };

  constructor(private toastService: ToastServiceProvider,
              private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter(): void {
    this.btnClass = "primary";
    this.btnText = "Start Watching";
    this.coords = undefined;
    this.markers = [];
  }

  ionViewWillLeave(): void {
    if (this.watchProcess){
      navigator.geolocation.clearWatch(this.watchProcess);
    }
  }

  startWatching(): void {
    if (!this.isWatching){
      this.markers = [];
      this.loading = this.loadingCtrl.create();
      this.loading.present().then(() => {
        if (navigator && navigator.geolocation){
          this.watchProcess = navigator.geolocation.watchPosition((position) => {
            this.setPosition(position);
            this.addMarker(position);
            this.loading.dismiss();
          }, (err) => (
            console.error(err)
          ), this.watchOptions);

          this.btnText = "Stop Watching";
          this.btnClass = "danger";
          this.isWatching = true;
        } else {
          this.loading.dismiss();
          this.toastService.presentToast('geolocation not supportet');
        }
      });
    } else {
      this.isWatching = false;
      navigator.geolocation.clearWatch(this.watchProcess);
      this.btnClass = "primary";

      this.btnText = "Start Watching";
    }
  }

  private setPosition(position): void {
    this.coords = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
  }

  private addMarker(pos: any): void {
    this.markers.push({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
      draggable: false,
      label: this.markers.length.toString()
    });
    this.markers = this.markers.slice();
  }
}
