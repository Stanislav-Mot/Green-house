import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/models';
import { PATH_S3_API } from '../../../constants'

@Component({
    selector: 'product-page',
    templateUrl: 'product-page.component.html',
    styleUrls: ['product-page.component.scss']
})
export class ProductPageComponent implements OnInit { 
    returnUrl!: string;

    product!: Product;

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private productsService: ProductsService,
    ) {
        
    }

    ngOnInit() {
        const idUser = this.route.snapshot.params.id;
        this.productsService.getById(idUser).pipe().subscribe((product) => {
            if(product.picture){
                product.picture = PATH_S3_API + product.picture;
            }
            this.product = product;
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      }

      backClicked() {
        this._location.back();
    }
}