import { Component, OnInit, Input} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/models';

@Component({
    selector: 'app-product-info',
    templateUrl: 'product-info.component.html',
    styleUrls: ['product-info.component.scss']
})
export class ProductInfoComponent implements OnInit { 

    @Input() product!: Product;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService,
    ) {
        
    }

    ngOnInit() {

    }

    navigateCategoryPage(id: number | undefined) {
        this.router.navigate([`/categories/${id}`]);
    }
}