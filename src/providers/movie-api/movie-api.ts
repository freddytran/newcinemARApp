import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";


/*
  Generated class for the MovieApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieApiProvider {

  apiUrl = 'https://swapi.co/api/films';
  defaultApiUrl = 'https://api.themoviedb.org/3/movie/'
  defaultApiUrlEnd = '?api_key=a0f3517280dc236868b2b6f8f7daace3&language=de-DE'
  apiUrl2 = 'https://api.themoviedb.org/3/movie/550?api_key=a0f3517280dc236868b2b6f8f7daace3&language=de';
  apiUrl3 = 'https://api.themoviedb.org/3/configuration?api_key=a0f3517280dc236868b2b6f8f7daace3';
  apiUrl4 = 'https://api.themoviedb.org/3/movie/now_playing?api_key=a0f3517280dc236868b2b6f8f7daace3&language=de&page=1'
  apiUrl5 = 'https://api.themoviedb.org/3/movie/157336?api_key=a0f3517280dc236868b2b6f8f7daace3&append_to_response=videos,images'

  config: any;


  constructor(public http: HttpClient) {
    console.log('Hello MovieApiProvider Provider');
  }

  getFilms(){
    return new Promise(resolve => {
      this.http.get('https://swapi.co/api/films').subscribe(data =>{
        resolve(data['results']);
      }, error1 => {
        console.log(error1);
      });
    });
  }

  getMovies():Observable<any>{
    /*let header = new Headers();
    header.set(x-api-key: )*/

    return this.http.get(this.apiUrl4);
  }

  getSpecificMovie(movieID:number):Observable<any>{
    return this.http.get((this.defaultApiUrl + movieID + this.defaultApiUrlEnd))
  }

  getMovieCast(movieID:number):Observable<any>{
    return this.http.get((this.defaultApiUrl + movieID + '/credits' + this.defaultApiUrlEnd));
  }

  getUpcomingMovies():Observable<any>{
    return this.http.get(this.defaultApiUrl + 'upcoming' + this.defaultApiUrlEnd + '&region=DE')
  }

}
