import { Component, OnInit, Input} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { first } from "rxjs/operators";

import { DescriptionsService } from 'src/app/services';
import { Description, Product } from 'src/app/models';
import { DialogComponent } from './../../../dialog/dialog.component';

@Component({
    selector: 'app-product-description',
    templateUrl: 'product-description.component.html',
    styleUrls: ['product-description.component.scss']
})
export class ProductDescriptonComponent implements OnInit  { 

    @Input() product!: Product;

    descriptions!: Description[];

    createForm!: FormGroup;

    updateForm!: FormGroup;

    loading = false;

    submitted = false;

    error = '';

    idProduct!: number;

    panelOpenState: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private descriptionsService: DescriptionsService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
    ) { 
        this.createForm = this.formBuilder.group({
            heading: ['', [Validators.required]],
            text: ['', [Validators.required]]
        });
        this.updateForm = this.formBuilder.group({
            heading: ['', [Validators.required]],
            text: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.idProduct= this.route.snapshot.params.id;
        this.descriptionsService.getByProductId(this.idProduct).pipe().subscribe((description) => {
            this.descriptions = description;
        });
    }

    get getControls() { return this.createForm.controls; }
    
    onSubmit() {
        this.submitted = true;

        if (this.createForm.invalid) return;

        this.loading = true;
        
        this.descriptionsService.create(this.createForm, this.product.id).pipe(first()).subscribe((description) => {
            this.descriptions.push(description);
            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: 'Description added' }
            });
            this.createForm.controls.text.setValue('')
            this.createForm.controls.heading.setValue('')
        },
            (error) => { this.error = error;},
        );
        this.loading = false;
    }

    updateDescription(descriptionUpdate: Description){
        this.submitted = true;

        if (this.updateForm.invalid) return;

        this.loading = true;
        
        this.descriptionsService.update(this.updateForm, descriptionUpdate.id).pipe(first()).subscribe((description) => {

            const index: number = this.descriptions.findIndex((x) => x === descriptionUpdate);

            this.descriptions[index] = description;

            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: 'Description Updated' }
            });

        },
            (error) => { this.error = error;},
        );
        this.loading = false;
    }

    deleteDescription(description: Description){
        const index: number = this.descriptions.findIndex((d) => d === description);
        this.descriptions.splice(index,1);
        this.descriptionsService.delete(description.id);
        this.dialog.open(DialogComponent, {
            width: '250px',
            data: {message: 'Successfully deleted' }
        });
    }

    togglePanel() {
        this.panelOpenState = !this.panelOpenState
    }
}