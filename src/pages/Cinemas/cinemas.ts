import { Component } from '@angular/core';
import { IonicPage,NavController } from 'ionic-angular';
import {MovieApiProvider} from "../../providers/movie-api/movie-api";


@IonicPage()
@Component({
  selector: 'page-cinemas',
  templateUrl: 'cinemas.html'
})
export class CinemasPage {
  films: any;


  constructor(public navCtrl: NavController, public movieAPIProvider: MovieApiProvider) {
    this.getMovies();


  }

  getMovies(){
    this.movieAPIProvider.getMovies().subscribe((res) =>{
      this.films = res.results;
    })
  }

  pushPage(page:string, id:number){
    this.navCtrl.push(page,{
      movieID: id
    });
  }
}
