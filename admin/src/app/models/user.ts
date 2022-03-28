import { Role } from '../enums';

export class User {
    id!: number;

    name!: string;

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
}
