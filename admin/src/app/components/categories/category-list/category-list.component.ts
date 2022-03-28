import {
    Component, ViewChild, OnInit
   } from "@angular/core";
   import { MatPaginator } from '@angular/material/paginator';
   import { MatTableDataSource } from '@angular/material/table';
   import { MatSort } from '@angular/material/sort';
   import { SelectionModel } from '@angular/cdk/collections';
   
   import { Category } from "src/app/models";
   import { CategoriesService } from "src/app/services/categories.service";
   import { Router } from "@angular/router";
@Component({
    selector: 'category-list',
    templateUrl: 'category-list.component.html',
    styleUrls: ['category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['id', 'name', 'picture', 'select'];

    categories: Category[] = [];

    dataSource!: MatTableDataSource<Category>;

    selection = new SelectionModel<Category>(true, []);

    constructor(private categoriesService: CategoriesService, private router: Router) { }

    ngOnInit() {
        this.categoriesService.getAll().pipe().subscribe((categories) => {
            this.categories = categories;
            this.dataSource = new MatTableDataSource<Category>(this.categories);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    removeSelectedRows() {
        this.selection.selected.forEach((item) => {
        const index: number = this.categories.findIndex((d) => d === item);
        this.categories.splice(index,1);
        this.categoriesService.delete(item.id);

        this.dataSource = new MatTableDataSource<Category>(this.categories);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Category>(true, []);
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        if(this.isAllSelected()) {
            this.selection.clear()
        }else {
            this.dataSource.data.forEach((row) => this.selection.select(row));
        }
    }

    navigatePageCategory(id: number) {
        this.router.navigate([`/categories/${id}`]);
    }
}