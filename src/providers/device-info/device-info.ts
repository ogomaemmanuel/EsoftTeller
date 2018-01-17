import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Device } from '@ionic-native/device';

/*
  Generated class for the DeviceInfoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DeviceInfoProvider {
  public deviceInfo:any;
  constructor(private device: Device) {
   this.deviceInfo=this.device;
  }
public getDevice(){
  return JSON.stringify(this.deviceInfo);
}
}
