import { FormControl } from "@angular/forms";
export class GreatorThanZeroValidator{
    static greatorThanZero(fc: FormControl){
        if(Number( fc.value.replace(/[^\d.-]/g, '')) * 1<=0){

         // Number( fc.value.replace(/[^\d.-]/g, '')) * 1<=0
          return ({greatorThanZero: true});
        } else {
          return (null);
        }
      }
}