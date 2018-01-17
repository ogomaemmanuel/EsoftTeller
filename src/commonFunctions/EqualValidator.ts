import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let password = AC.get('NewPin').value; // to get value in input tag
       let confirmPassword = AC.get('NewPinConfirm').value; // to get value in input tag
        if(password != confirmPassword) {
            AC.get('NewPinConfirm').setErrors( {MatchPassword: true} )
        } else {
           
            return null
        }
    }
}