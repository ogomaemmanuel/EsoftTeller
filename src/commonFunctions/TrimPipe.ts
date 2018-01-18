import {Pipe, PipeTransform, Injectable} from '@angular/core';
 
@Pipe({name: 'TrimPipe'})
@Injectable()
export class TrimPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return '';
    }
    return value.trim();
  }
}