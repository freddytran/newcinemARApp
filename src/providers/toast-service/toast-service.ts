import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Toast, ToastController} from "ionic-angular";

/*
  Generated class for the ToastServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToastServiceProvider {
  toast: Toast = null;

  constructor(private toastCtrl: ToastController) {
    console.log('Hello ToastServiceProvider Provider');

  }

  presentToast(text:string): void{
    let toastData = {
      message: text,
      duration: 3000,
      position: 'top'
    };
    this.showToast(toastData);
  }

  showToast(data:any):void{
    this.toast ? this.toast.dismiss():false;
    this.toast = this.toastCtrl.create(data);
    this.toast.present();
  }

}
