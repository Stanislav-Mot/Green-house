
export class PricesProduct {

    productsId: number;

    count: number;

    totalPrice: number;

    constructor(productsId: number, count: number, totalPrice: number){
        this.productsId = productsId;
        this.count = count; 
        this.totalPrice = totalPrice;
    }

}