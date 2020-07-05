import { Pipe, PipeTransform } from '@angular/core';
import { ApartmentService } from '../services/apartment.service';

@Pipe({
  name: 'sortDistrict'
})
export class SortDistrictPipe implements PipeTransform {
  constructor(private apartService: ApartmentService){}
  transform(apartments:any, filterValue: string){
    if (!filterValue) {
      return apartments;
    }
    if (!apartments) {
      return [];
    }
    return apartments.filter((apart)=>{return apart.district.nameUA.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1})
  }
}
