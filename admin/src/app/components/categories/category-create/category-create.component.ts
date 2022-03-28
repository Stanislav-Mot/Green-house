import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { CategoriesService } from 'src/app/services/categories.service';
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from './../../dialog/dialog.component';
import { Category } from 'src/app/models';

@Component({
    selector: 'category-create',
    templateUrl: 'category-create.component.html',
    styleUrls: ['category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {
    createForm!: FormGroup;

    loading = false;

    submitted = false;

    error = '';

    fileName = '';

    category!: Category;

    file!:File;

    constructor(
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private _location: Location,
        public dialog: MatDialog,
    ) { }

    ngOnInit() {
        this.createForm = this.formBuilder.group({
            name: ['', [Validators.required]],
        });
      }

    get getControls() { return this.createForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.createForm.invalid) return;

        this.loading = true;
        
        this.categoriesService.create(this.createForm).pipe(first()).subscribe((category) => {
            this.category = category;
            this.dialog.open(DialogComponent, {
                width: '250px',
                data: {message: 'Category added' }
            });
            if (this.file && this.category.id) {

                const data = new FormData();
    
                data.append("file", this.file);
    
                this.categoriesService.updatePic(data, this.category.id)
                .pipe(first()).subscribe((category: any) => { 
                        this.dialog.open(DialogComponent, {
                            width: '250px',
                            data: {message: 'Picture added' }
                        });
                    },
                    (error) => {   this.error = error; },
                );
    
                    
            }
        },
            (error) => { this.error = error;},
        );
        this.loading = false;
    }

    backClicked() {
        this._location.back();
    }

    onFileSelected(event: any) {
        this.file = event.target.files[0];
        
        this.fileName = this.file.name;
    }
}