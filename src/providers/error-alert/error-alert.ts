import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ErrorAlertProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ErrorAlertProvider {

  constructor(private alertCtrl: AlertController) {
  }

  public alertError(errorMessage: string,title:string) {
    this.buildErrorMessage(errorMessage,title);
  }

  private buildErrorMessage(alertMessage: string,title:string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: alertMessage,
      mode: 'md',
      buttons:['ok']
    });
    alert.present();
  }
}
