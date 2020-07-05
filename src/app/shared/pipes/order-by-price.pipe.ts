import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByPrice'
})
export class OrderByPricePipe implements PipeTransform {
  transform(apartArray: Array<any>, orderValue: string, reverse: boolean) {
    if (orderValue === null){
      return apartArray;
    }
    if (reverse) {
      return apartArray.reverse();
    }
    if(orderValue === 'price'){
      return apartArray.sort((a, b) => a.price - b.price);
    }
  }
}
