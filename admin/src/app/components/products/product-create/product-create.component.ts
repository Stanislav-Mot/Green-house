import { Category } from 'src/app/models';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray,FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { ProductsService } from 'src/app/services/products.service';
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from '../../dialog/dialog.component'
import { CategoriesService } from 'src/app/services';

@Component({
    selector: 'app-product-create',
    templateUrl: 'product-create.component.html',
    styleUrls: ['product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
    createForm!: FormGroup;

    loading = false;

    submitted = false;

    error = '';

    categories: Category[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private _location: Location,
        public dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            price: ['', Validators.required],
            sale: [],
            category: new FormControl({
                id: [],
                name: [],
                picture: [],
            })
        });
        this.categoriesService.getAll().pipe().subscribe((categories) => {
            this.categories = categories;
        });
      }

    get getControls() { return this.createForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.createForm.invalid) {
          return;
        }
        this.loading = true;
        this.productsService.create(this.createForm).pipe(first()).subscribe(() => { 
            this.createForm.controls.name.setValue(null);
            this.createForm.controls.price.setValue(null);
            this.createForm.controls.sale.setValue(null);

            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: 'Product added' }
            });
            this.loading = false;
        },
            (error) => {
                this.error = error;
                this.loading = false;
            },);
    }

    backClicked() {
        this._location.back();
    }
}
