import {
    Component, ViewChild, OnInit
   } from "@angular/core";
   import { MatPaginator } from '@angular/material/paginator';
   import { MatTableDataSource } from '@angular/material/table';
   import { MatSort } from '@angular/material/sort';
   import { SelectionModel } from '@angular/cdk/collections';

   import { User } from "src/app/models";
   import { UserService } from "src/app/services";
   import { Router } from "@angular/router";

@Component({
    selector: 'app-list-users',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.scss']
})
export class UsersListComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    @ViewChild(MatSort) sort!: MatSort;

    displayedColumns: string[] = ['id', 'username', 'email', 'role', 'first_name','last_name','patronymic','phone','active','select'];

    users: User[] = [];

    dataSource!: MatTableDataSource<User>;

    selection = new SelectionModel<User>(true, []);

    constructor(private categoriesService: UserService, private router: Router) { }

    ngOnInit() {
        this.categoriesService.getAll().pipe().subscribe((users) => {
            this.users = users;
            this.dataSource = new MatTableDataSource<User>(this.users);
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
        const index: number = this.users.findIndex((d) => d === item);
        this.users.splice(index,1);
        this.categoriesService.delete(item.id);

        this.dataSource = new MatTableDataSource<User>(this.users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    this.selection = new SelectionModel<User>(true, []);
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

    navigateUserPage(id: number) {
        this.router.navigate([`/users/${id}`]);
    }
}
