import { IUser } from '../interfaces/user.interface';

export class User implements IUser{
    constructor(
        public name:string,
        public phone:string,
        public city:string,
        public image:string
    ){}
}