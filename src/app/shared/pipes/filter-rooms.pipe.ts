import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterRooms'
})
export class FilterRoomsPipe implements PipeTransform {

  transform(apartments: Array<any>, filterValue: number){
    if (!filterValue) {
      return apartments;
    }
    if (!apartments) {
      return [];
    }
    let filtered = apartments.filter(apart => apart.rooms == filterValue);
    return filtered;
  }

}
