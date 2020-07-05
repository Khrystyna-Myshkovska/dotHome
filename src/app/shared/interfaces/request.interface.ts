import { IApartments } from './apartment.interface';

export interface IRequest{
    id:string;
    name:string;
    email:string;
    phone:number;
    text:string;
    apartment:IApartments;
    date:number;
}