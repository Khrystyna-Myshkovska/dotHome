import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(apartments: Array<any>, filterValue: string){
    if (!filterValue) {
      return apartments;
    }
    if (!apartments) {
      return [];
    }
    return apartments.filter((apart)=>{return apart.location.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1 })
  }
}