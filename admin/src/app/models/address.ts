import { User  } from '../models'
export class Address {
    id!: number;
    city?: string;
    street?: string;
    build?: number;
    entrance?:number;
    flat?: number;
    user!: User;
}