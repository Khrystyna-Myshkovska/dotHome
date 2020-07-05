import { IRequest } from '../interfaces/request.interface';
import { IApartments } from '../interfaces/apartment.interface';

export class Request implements IRequest {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public phone: number,
        public text: string,
        public apartment: IApartments,
        public date:number = Date.now()
    ) { }
}