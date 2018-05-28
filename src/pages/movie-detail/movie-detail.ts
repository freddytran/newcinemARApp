import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";

/**
 * Generated class for the MovieDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-detail',
  templateUrl: 'movie-detail.html',
})
export class MovieDetailPage {

  film: any;
  cast: any;

  constructor(public navCtrl: NavController, private navParams: NavParams, public movieAPIProvider: MovieApiProvider) {
    let movieID = this.navParams.get('movieID');
    this.getMovieInfo(movieID);
    this.getMovieCast(movieID);
  }

  getMovieInfo(movieID:number){
    this.movieAPIProvider.getSpecificMovie(movieID).subscribe((res)=>{
      this.film = res;
      console.log(res)
    })
    }

    getMovieCast(movieID:number){
    this.movieAPIProvider.getMovieCast(movieID).subscribe((res)=>{
      this.cast = res.cast;
    })
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovieDetailPage');
  }

}
