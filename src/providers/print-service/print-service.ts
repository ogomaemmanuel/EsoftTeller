import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ErrorAlertProvider } from '../error-alert/error-alert';
/*
  Generated class for the PrintServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PrintServiceProvider {

  constructor(
    public printer: Printer,
    private alertCtr:ErrorAlertProvider
  
  ) {
    console.log('Hello PrintServiceProvider Provider');
  }

  printFile(file:any){
   return this.printer.isAvailable().then(()=>{this.printerAvailableCallback()},()=>this.printNotAvailableCallBack() );

  }

  printerAvailableCallback(){
    this.printer.pick().then(printer=>{
      if(printer){

        let options: PrintOptions = {
          name: 'MyDocument',
          printerId: printer,
          duplex: false,
          landscape: true,
          grayscale: true
        };
     
     this.printer.print("<h1>Emmanuel</h1>", options);

      }


    });
   
  }

  printNotAvailableCallBack(){
    this.alertCtr.alertError("Printer not Availabe","print error")
  }

}
