import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController} from 'ionic-angular';
import { ToastServiceProvider} from "../../providers/toast-service/toast-service";
import {MarkerInterface} from "../../interfaces/marker.interface";
import {CinemaPosInterface} from "../../interfaces/cinemaPos.interface";

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html'
})
export class ScannerPage {
  @ViewChild('map') mapElement: ElementRef;
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
    timeout: 1000,
    maximumAge: 0
  };


  map: any;
  foundCinemas: any;



  constructor(private toastService: ToastServiceProvider,
              private loadingCtrl: LoadingController, public navCtrl: NavController) {
    /*this.getCurrentPosition();*/
  }

  ionViewWillEnter(): void {
    this.btnClass = "dark";
    this.btnText = "Scan nach AR - Inhalten";
    this.coords = undefined;
    this.markers = [];
  }

  ionViewWillLeave(): void {
    if (this.watchProcess){
      navigator.geolocation.clearWatch(this.watchProcess);
    }
  }

  getCurrentPosition(){
    this.watchProcess = navigator.geolocation.watchPosition(position => {
      const currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      this.initMap(position.coords.latitude, position.coords.longitude, currentPosition);
    }, error1 => {
      console.error(error1)
    }, {timeout: 1000, maximumAge:0, enableHighAccuracy:true})
  }

  initMap(centerLat: number, centerLng: number, currentPos: google.maps.LatLng) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: centerLat, lng: centerLng}
    });
    const marker = new google.maps.Marker({
      position: {lat: centerLat, lng: centerLng},
      map: this.map,
      animation: google.maps.Animation.DROP,
      title: 'YOU RIGHT NOW'
    });
    this.doNearbySearch(currentPos);
  }

  private doNearbySearch(coords: google.maps.LatLng){
    const request: google.maps.places.PlaceSearchRequest = {
      location: coords,
      radius: 7000,
      types: ['movie_theater']
    };

    let service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK && results != null) {
        results.forEach((place) => {
          console.log(place);
          //place a marker on the location of a place
          const marker = new google.maps.Marker({
            position: place.geometry.location,
            map: this.map,
            animation: google.maps.Animation.DROP,
            title: place.name
          });
          console.log(place.name);
          marker.addListener('click', () => {
            this.calculateDirection(coords, place.geometry.location);
          });
        });
        this.foundCinemas = results;
        console.log(this.foundCinemas);
        this.toastService.presentToast('Es sind AR - Inhalte von Kinos in unmittelbarer Nähe')
      }else{
        navigator.geolocation.clearWatch(this.watchProcess)
        this.toastService.presentToast('Es sind leider keine AR - Inhalte in der Nähe')
      }
    });
  }

  private calculateDirection(origin: google.maps.LatLng, destination: google.maps.LatLng) {
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    };
    directionsService.route(request, (response, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        console.log("directionsService response", response);
        directionsDisplay.setDirections(response);
      }
    });
  }

  pushPage(page:string, id:number){
    this.navCtrl.push(page,{
      movieID: id
    });
  }

  /*startWatching(): void {
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
*/

}
