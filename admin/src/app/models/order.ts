import { Product, User, Address } from "./";

export class Order {
    id!: number;
    placedAt!: string;
    status!: string;
    address!: Address;
    products!: Product[];
    user!: User;
}