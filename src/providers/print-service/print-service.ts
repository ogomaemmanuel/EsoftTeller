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
   return this.printer.isAvailable().then(()=>{this.printerAvailableCallback(file)},()=>this.printNotAvailableCallBack() );

  }

  printerAvailableCallback(file:any){
    this.printer.pick().then(printer=>{
      if(printer){

        let options: PrintOptions = {
          name: 'Customer Receipt',
          printerId: printer,
          duplex: false,
          landscape: true,
          grayscale: false,

        };

        debugger;
    let receipt=file;
     this.printer.print(receipt, options);

      }


    });
   
  }

  printNotAvailableCallBack(){
    this.alertCtr.alertError("Printer not Availabe","print error")
  }
}
