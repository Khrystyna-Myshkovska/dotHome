import { IDistrict } from '../interfaces/district.interface';

export class District implements IDistrict{
    constructor(
        public id: string,
        public nameUA:string,
        public nameEN:string
    ){}
}