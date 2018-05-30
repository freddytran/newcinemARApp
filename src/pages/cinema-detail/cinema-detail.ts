import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TheaterApiProvider} from "../../providers/theater-api/theater-api";

/**
 * Generated class for the CinemaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google;


@IonicPage()
@Component({
  selector: 'page-cinema-detail',
  templateUrl: 'cinema-detail.html'

})
export class CinemaDetailPage {
@ViewChild('map') mapElement: ElementRef;

  map: any;
  directionService = new google.maps.DirectionsService;
  displayDirection = new google.maps.DirectionsRenderer;
  displayTraveTime = new google.maps.DistanceMatrixService;
  theater: any;
  kinoCoord: any;
  travelDistance: any;
  travelTime: any;
  name: string;

  constructor(public navCtrl: NavController, private navParams: NavParams, public theaterProvider: TheaterApiProvider) {
    this.name = navParams.get('name')
    this.getTheaterInfo()
    console.log(name);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CinemaDetailPage');
  }

  getTheaterInfo(){
    this.theaterProvider.getTheaters().subscribe((res) =>{
        this.theater = res.cinemas;
        this.createKinoCoords(this.name, this.theater)
    })
  }

  createKinoCoords(kinoName: string, theater: any){
    navigator.geolocation.getCurrentPosition(position => {
      const currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      for(let position of theater){
        if(kinoName == position.name){
          this.kinoCoord = new google.maps.LatLng(position.lat, position.lng);
          console.log(this.kinoCoord);
        }
      }
      this.initMap(currentPosition);
      this.calculateAndDisplayRoute(currentPosition, this.kinoCoord);
      this.calculateTravelTime(currentPosition, this.kinoCoord);
    },error1 => {
      console.log('Geolocation not Supported!')
    }, {timeout:30000, enableHighAccuracy:true})


  }

  initMap(mapCenter: google.maps.LatLng) {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat: 41.85, lng: -87.65}
    });
    this.displayDirection.setMap(this.map);
  }

  calculateAndDisplayRoute(origin: google.maps.LatLng, destination: google.maps.LatLng) {
    this.directionService.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.displayDirection.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  calculateTravelTime(origin: google.maps.LatLng, destination: google.maps.LatLng){
    this.displayTraveTime.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }, (response, status) =>{
      if(status === 'OK'){
        this.travelDistance = response.rows[0].elements[0].distance;
        this.travelTime = response.rows[0].elements[0].duration;
        console.log(this.travelDistance.text);
      }else{
        window.alert('Travel time could not be calculated due to ' + status);
      }
    })
  }
}
