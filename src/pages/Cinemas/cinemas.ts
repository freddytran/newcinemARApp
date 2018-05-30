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
  upcomingFilms:any;

  constructor(public navCtrl: NavController, public movieAPIProvider: MovieApiProvider) {
    this.getMovies();
    this.getUpcomingMovies()
  }

  getMovies(){
    this.movieAPIProvider.getMovies().subscribe((res) =>{
      this.films = res.results;
    })
  }

  getUpcomingMovies(){
    this.movieAPIProvider.getUpcomingMovies().subscribe((res) =>{
      this.upcomingFilms = res.results;
    })
  }

  getMovieCard(type:any){
    return this.upcomingFilms[type];
  }

  pushPage(page:string, id:number){
    this.navCtrl.push(page,{
      movieID: id
    });
  }
}
