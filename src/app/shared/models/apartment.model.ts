import { IApartments } from '../interfaces/apartment.interface';
import { IDistrict } from '../interfaces/district.interface';

export class Apartment implements IApartments{
    constructor(
        public id:string,
        public district:IDistrict,
        public location:string,
        public map:string,
        public area:number,
        public price:number,
        public rooms:number,
        public floor:number,
        public description:string,
        public date:number,
        public imageMain:string,
        public imageSecond:string,
        public imageThird:string,
        public imageFourth:string,
        public status:boolean = true
    ){}
}