import { IDistrict } from './district.interface';

export interface IApartments{
    id:string;
    district:IDistrict;
    location:string;
    map:string;
    area:number;
    price:number;
    rooms:number;
    floor:number;
    description:string;
    date:number;
    imageMain:string;
    imageSecond:string;
    imageThird:string;
    imageFourth:string;
    status:boolean;
}