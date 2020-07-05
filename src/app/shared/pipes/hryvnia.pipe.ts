import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hryvnia'
})
export class HryvniaPipe implements PipeTransform {
  transform(value: any, symbol?: string): string {
    if (!symbol) {
      return value + '₴';
    }
    if (!value) {
      return ''
    }
    return value + `${symbol}`;
  }
}
