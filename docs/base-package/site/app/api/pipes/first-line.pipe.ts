import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'firstLine'})
export class FirstLinePipe implements PipeTransform{
  transform(value: any): any {
    if (!value) {
      return null;
    }
    const val = value.split('\n');
    return val[0];
  }

}
