import {Component, ElementRef, ViewChild} from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {CinemaPosInterface} from "../../interfaces/cinemaPos.interface";
import { } from '@types/googlemaps';
import {TheaterApiProvider} from "../../providers/theater-api/theater-api";
import {CinemaDetailPage} from "../cinema-detail/cinema-detail";

declare var google;

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',

})
export class LocationPage {
  @ViewChild('map') mapRef: ElementRef;
  map: google.maps.Map;
  markers = [];
  cinemaPos: CinemaPosInterface[];
  theaters: any;
  movieTime: any;

  constructor(public navCtrl: NavController, public theaterProvider: TheaterApiProvider){
    this.getTheaters();
    this.getMovieTimes();
  }

  ionViewWillEnter(){

  }

  /*findNearbyLocations(){
    navigator.geolocation.getCurrentPosition(position => {
      const mapCenter = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      console.log(position.coords.latitude, position.coords.longitude);
      this.initMap(mapCenter);
      this.doNearbySearch(mapCenter);
    },(error1) => {
      console.log("geolocation not supported")
    }, {maximumAge:60000, timeout:5000, enableHighAccuracy:true});
  }

  initMap(centerCoordinates: google.maps.LatLng){
    this.map = new google.maps.Map(this.mapRef.nativeElement, {
      zoom: 15,
      center: centerCoordinates
    });
  }

  private doNearbySearch(coords: google.maps.LatLng){
    const request: google.maps.places.PlaceSearchRequest = {
      location: coords,
      radius: 100000,
      types: ['movie_theater']
    };

    let service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, (results, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
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
            //do direction calculation
            this.calculateDirection(coords, place.geometry.location)
            this.calculateDistance(coords, place.geometry.location)
          });
        });
      }
    });
  }

  private calculateDirection(origin: google.maps.LatLng, destination: google.maps.LatLng){
    let directionsService = new google.maps.DirectionsService();
    let directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode['DRIVING']
    };
    directionsService.route(request, (response, status) => {
      if (status == 'OK') {
        console.log("directionsService response", response);
        directionsDisplay.setDirections(response);
      }
    });

  }*/

  getTheaters(){
    this.theaterProvider.getTheaters().subscribe((res) =>{
      this.theaters = res.cinemas;
      console.log(res.cinemas.movies);
    })
  }

  getMovieTimes(){
    this.theaterProvider.getTheaters().subscribe((res) =>{
      this.movieTime = res.movies;
      console.log(this.movieTime);
    })
  }

  //Berechnet die Entfernung vom aktuellen Standort zum Zielstandort in km
  calculateDistance(origin: google.maps.LatLng, destination: google.maps.LatLng):number{
    let dx = 71.5 * (origin.lng() - destination.lng());
    let dy = 111.3 * (origin.lat() - destination.lat());
    let distance = Math.sqrt(dx * dx* + dy * dy);
    return distance;
  }

  pushPage(page:string, movieName:string){
    this.navCtrl.push(page,{
      name: movieName
    });
  }
}
