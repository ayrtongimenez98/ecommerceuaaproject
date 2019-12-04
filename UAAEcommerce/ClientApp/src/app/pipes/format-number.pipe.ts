import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber'
})
export class FormatNumberPipe implements PipeTransform {
  transform(num: number): string {
    if (num !== undefined && num !== null) {
      var formatter = new Intl.NumberFormat("es-PY");
      return formatter.format(num);
    } else {
      return '';
    }
  }
}
