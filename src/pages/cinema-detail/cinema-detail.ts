import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TheaterApiProvider} from "../../providers/theater-api/theater-api";

/**
 * Generated class for the CinemaDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cinema-detail',
  templateUrl: 'cinema-detail.html'

})
export class CinemaDetailPage {

  theater: any;
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
    })
  }

}
