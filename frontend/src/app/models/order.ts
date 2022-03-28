import { Product, User, Address, PricesProduct } from "./";

export class Order {
    id!: number;
    placedAt!: Date;
    status!: string;
    address!: Address;
    products!: Product[];
    _user!: User;

    set user(user: User) {
        this._user = user;
   }

    totalPrice: number;
    pricesProduct: PricesProduct[];
}