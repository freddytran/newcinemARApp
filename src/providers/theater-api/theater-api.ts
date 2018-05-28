import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/*
  Generated class for the TheaterApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TheaterApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello TheaterApiProvider Provider');
  }

  getTheaters():Observable<any>{
    /*let header = new Headers();
    header.set(x-api-key: )*/

    return this.http.get('assets/data/cinemas.json');
  }

  getMoveTime():Observable<any>{
    return this.http.get('assets/data/cinemas.json');
  }

}
