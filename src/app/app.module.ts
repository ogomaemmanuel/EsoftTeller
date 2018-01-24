import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HttpModule } from "@angular/http";
import { CustomerProvider } from '../providers/customer/customer';
import { CustomerDetailsserviceProvider } from '../providers/customer-detailsservice/customer-detailsservice';
import { AccountsDetailsServiceProvider } from '../providers/acconts-details-service/acconts-details-service';
import { IonicStorageModule } from '@ionic/storage';
import { MinistatementProvider } from '../providers/ministatement/ministatement';
import { AtmCardsProvider } from '../providers/atm-cards/atm-cards';
import { DepositTransactionProvider } from '../providers/deposit-transaction/deposit-transaction';
import { DeviceInfoProvider } from '../providers/device-info/device-info';
import { Device } from '@ionic-native/device';
import { ErrorAlertProvider } from '../providers/error-alert/error-alert';
import { EndPointHostProvider } from '../providers/end-point-host/end-point-host';
import { CompanyDetailsProvider } from '../providers/company-details/company-details';
import { PipesModule } from '../commonFunctions/pipes.module';
import { TellerServiceProvider } from '../providers/teller-service/teller-service';

@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpModule,    
    IonicModule.forRoot(MyApp),
    PipesModule,
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CustomerProvider,
    CustomerDetailsserviceProvider,
    AccountsDetailsServiceProvider,
    MinistatementProvider,
    AtmCardsProvider,
    Device,
    DepositTransactionProvider,
    DeviceInfoProvider,
    ErrorAlertProvider,
    EndPointHostProvider,
    CompanyDetailsProvider,
    TellerServiceProvider,
   
   
  ]
})
export class AppModule {}
