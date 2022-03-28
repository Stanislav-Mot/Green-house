import {
    Component, ViewChild, OnInit
   } from "@angular/core";
   import { MatPaginator } from '@angular/material/paginator';
   import { MatTableDataSource } from '@angular/material/table';
   import { MatSort } from '@angular/material/sort';
   import { SelectionModel } from '@angular/cdk/collections';
   
   import { Order } from "src/app/models";
   import { OrdersService } from "src/app/services";
   import { Router } from "@angular/router";
@Component({
    selector: 'app-order-list',
    templateUrl: 'order-list.component.html',
    styleUrls: ['order-list.component.scss']
})
export class OrderListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['id', 'placedAt', 'status', 'address', 'products', 'user', 'select'];
;
    orders: Order[] = [];

    dataSource!: MatTableDataSource<Order>;

    selection = new SelectionModel<Order>(true, []);

    constructor(private ordersService: OrdersService, private router: Router) { }

    ngOnInit() {
        this.ordersService.getAll().pipe().subscribe((orders) => {
            this.orders = orders;
            this.dataSource = new MatTableDataSource<Order>(this.orders);
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
        const index: number = this.orders.findIndex((d) => d === item);
        this.orders.splice(index,1);
        this.ordersService.delete(item.id);

        this.dataSource = new MatTableDataSource<Order>(this.orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<Order>(true, []);
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
        this.router.navigate([`/orders/${id}`]);
    }

    navigatePageProduct(id: number) {
        this.router.navigate([`/products/${id}`]);
    }

    navigatePageUser(id: number) {
        this.router.navigate([`/users/${id}`]);
    }
}