import {
    Component, ViewChild, OnInit
   } from "@angular/core";
   import { MatPaginator } from '@angular/material/paginator';
   import { MatTableDataSource } from '@angular/material/table';
   import { MatSort } from '@angular/material/sort';
   import { SelectionModel } from '@angular/cdk/collections';
   
   import { Product } from "src/app/models";
   import { ProductsService } from "src/app/services";
   import { Router } from "@angular/router";
@Component({
    selector: 'product-list',
    templateUrl: 'product-list.component.html',
    styleUrls: ['product-list.component.scss']
})
export class ProductListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['id', 'name', 'price', 'placedAt', 'sale','picture', 'category', 'select'];

    products: Product[] = [];

    dataSource!: MatTableDataSource<Product>;

    selection = new SelectionModel<Product>(true, []);

    constructor(private productsService: ProductsService, private router: Router) { }

    ngOnInit() {
        this.productsService.getAll().pipe().subscribe((products) => {
            this.products = products;
            this.dataSource = new MatTableDataSource<Product>(this.products);
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
        const index: number = this.products.findIndex((d) => d === item);
        this.products.splice(index,1);
        this.productsService.delete(item.id);

        this.dataSource = new MatTableDataSource<Product>(this.products);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Product>(true, []);
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

    navigateProductPage(id: number) {
        this.router.navigate([`/products/${id}`]);
    }

    navigateCategoryPage(id: number) {
        this.router.navigate([`/categories/${id}`]);
    }
}