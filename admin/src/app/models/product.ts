import { Category } from 'src/app/models';
export class Product {
    id!: number;
    name!: string;
    picture?: string;
    price!: number;
    sale?: number;
    placedAt!: string;
    category!: Category;
}