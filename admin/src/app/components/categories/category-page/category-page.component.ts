import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models';
import { first } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { PATH_S3_API } from '../../../constants'
import { DialogComponent } from './../../dialog/dialog.component';

@Component({
    selector: 'category-page',
    templateUrl: 'category-page.component.html',
    styleUrls: ['category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {
    updateForm!: FormGroup;

    loading = false;

    submitted = false;

    returnUrl!: string;

    error = '';

    fileName = '';

    idCategory: number;

    category: Category | undefined;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private categoriesService: CategoriesService,
        private _location: Location,
        public dialog: MatDialog,
    ) {
        
        this.idCategory = this.route.snapshot.params.id;
        categoriesService.getById(this.idCategory).pipe().subscribe((category) => {
            if(category.picture){
                this.fileName = 'picture exists'
                category.picture = PATH_S3_API + category.picture;
            }
            
            this.category = category;

            this.updateForm.controls.name.setValue(this.category.name)
            this.updateForm.controls.id.setValue(this.category.id)
        });
    }

    ngOnInit() {
        this.updateForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            id: [{ value: this.idCategory, disabled: true }]
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      }

    get getControls() { return this.updateForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.updateForm.invalid) {
          return;
        }
        if(this.category) {
            this.loading = true;
            this.categoriesService.update(this.updateForm, this.idCategory ).pipe(first()).subscribe(() => { 
                this.dialog.open(DialogComponent, {
                    width: '250px',
                    data: {message: 'category updated' }
                  });
            },
                (error) => {
                  this.error = error;
                },);

            this.loading = false;
        }
    }

    onFileSelected(event: any) {

        const file:File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const data = new FormData();

            data.append("file", file);

            this.categoriesService.updatePic(data, this.idCategory)
            .pipe(first()).subscribe((category: any) => { 
                category.picture = PATH_S3_API + category.picture;
                this.category = category;
                this.updateForm.controls.picture.setValue(this.category?.picture)
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

    backClicked() {
        this._location.back();
    }

}