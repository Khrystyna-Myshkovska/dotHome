import { Component, OnInit } from '@angular/core';
import { ApartmentService } from 'src/app/shared/services/apartment.service';
import { DistrictService } from 'src/app/shared/services/district.service';
import { IDistrict } from 'src/app/shared/interfaces/district.interface';
import { trigger, style, animate, transition, } from '@angular/animations';

@Component({
  selector: 'app-apartments',
  templateUrl: './apartments.component.html',
  styleUrls: ['./apartments.component.scss'],
  animations: [
    trigger('appear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.7s 1s ease-in-out', style({ opacity: 1 })),
      ]),
    ])
  ]
})
export class ApartmentsComponent implements OnInit {

  apartments = { data: [], count: 0 };
  filteredItems: Array<any>;
  orderValue = null;
  countRooms: number;
  districtSearch: string;
  filterApart: string;
  reverseTable: boolean;
  districts: Array<any>;
  district: IDistrict;
  filteredRooms: any;
  config = {
    id: 'custom',
    itemsPerPage: 6,
    currentPage: 1,
    totalItems: this.apartments.count
  };
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  constructor(private apartService: ApartmentService, private distService: DistrictService) { }

  ngOnInit(): void {
    this.getApartments();
    this.getDistricts();
  }
  private getDistricts() {
    this.distService.getFireBaseDisctricts().subscribe(actions => {
      this.districts = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  private getApartments() {
    this.apartService.getFireBaseApartments().subscribe(actions => {
      this.apartments.data = actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        this.apartments.count = this.apartments.data.length;
        return Object.assign({}, { id: id }, data);
      });
    });
  }
  filterAddress(value:string):any[]{
    let currentData = this.apartments.data;
    console.log(value)
    if(!value){
      return currentData;
    }
    if(!this.apartments.data){
      return [];
    }if(value!=''){
      let sortD = this.apartments.data.filter((apart)=>{return apart.location.toLowerCase().indexOf(value.toLowerCase()) !== -1 })
      this.apartments.data = sortD;
      this.apartments.count = sortD.length;
    }
  }
  setDistrict(): void {
    const index = this.districts.findIndex(elem => elem.nameUA.toLocaleLowerCase() === this.districtSearch.toLocaleLowerCase());
    this.district = this.districts[index];
    this.apartService.getSortedByDistrict(this.districtSearch).subscribe(
      data => {
        this.apartments.data = data;
        this.apartments.count = this.apartments.data.length;
      });
  }
  setRooms(): void {
    let room = +this.countRooms;
    this.apartService.getRooms(room).subscribe(
      data => {
        this.apartments.data = data;
        console.log(data);
        this.apartments.count = this.apartments.data.length;
      });
  }
  onPageChange(event) {
    console.log(event);
    this.config.currentPage = event;
  }
  setOrder(itemToCompare: string) {
    if (this.orderValue === itemToCompare) {
      this.reverseTable = !this.reverseTable;
    } else {
      this.orderValue = itemToCompare;
      this.reverseTable = false;
    }
  }
  
}
