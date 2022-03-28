import { Address } from './address';
import { Role } from '../enums';
import { Product } from '../models/product'

export class User {
    id!: number;

    email!: string;

    username!: string;

    password!: string;

    first_name?: string;

    last_name?: string;

    patronymic?: string;
    
    roles!: Role;

    token?: string;

    phone? : string;

    active!: boolean;

    favourite_products?: Product[];
    
    cart_products?: Product[];

    address?: Address;
}
