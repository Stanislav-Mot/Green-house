import { Component, OnInit, Input} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ProductsService } from 'src/app/services';
import { Product } from 'src/app/models';
import { PATH_S3_API } from '../../../../constants'
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from './../../../dialog/dialog.component';

@Component({
    selector: 'app-product-image',
    templateUrl: 'product-image.component.html',
    styleUrls: ['product-image.component.scss']
})
export class ProductImageComponent implements OnInit { 

    @Input() product!: Product;

    fileName = '';

    error = '';

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productsService: ProductsService,
        public dialog: MatDialog,

    ) {
        
    }

    ngOnInit() {

    }

    onFileSelected(event: any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const data = new FormData();

            data.append("file", file);

            this.productsService.updatePic(data, this.product.id)
            .pipe(first()).subscribe((product: any) => { 
                product.picture = PATH_S3_API + product.picture;
                this.product = product;
            },
                (error) => {
                    this.error = error;

                },);

                this.dialog.open(DialogComponent, {
                    width: '250px',
                    data: {message: 'Picture updated' }
                });
        }
    }
}