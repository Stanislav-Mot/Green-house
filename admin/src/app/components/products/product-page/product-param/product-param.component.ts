import { Component, OnInit, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { ParamsService } from 'src/app/services';
import { Param, Product } from 'src/app/models';
import { DialogComponent } from './../../../dialog/dialog.component';

@Component({
    selector: 'app-product-param',
    templateUrl: 'product-param.component.html',
    styleUrls: ['product-param.component.scss']
})
export class ProductParamComponent implements OnInit  { 

    @Input() product!: Product;

    params!: Param[];

    updateForm!: FormGroup;

    loading = false;

    submitted = false;

    error = '';

    idProduct!: number;

    constructor(
        private formBuilder: FormBuilder,
        private paramsService: ParamsService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) { 
        this.updateForm = this.formBuilder.group({
            text: ['', [Validators.required]],
            percent: ['', [
                Validators.required,
                Validators.pattern("^[1-9][0-9]?$|^100$"),
                Validators.maxLength(3),]
            ]
        });
    }

    ngOnInit() {
        this.idProduct= this.route.snapshot.params.id;
        this.paramsService.getById(this.idProduct).pipe().subscribe((params) => {
            this.params = params;
        });
    }

    get getControls() { return this.updateForm.controls; }

    updateParam(paramUpdate: Param){
        this.submitted = true;

        if (this.updateForm.invalid) return;

        this.loading = true;
        
        this.paramsService.update(this.updateForm, paramUpdate.id).pipe(first()).subscribe((param) => {

            const index: number = this.params.findIndex((x) => x === paramUpdate);

            this.params[index] = param;

            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: 'Param Updated' }
            });

        },
            (error) => { this.error = error;},
        );
        this.loading = false;
    }
}