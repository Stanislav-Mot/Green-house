import { DialogUpdateAddressComponent } from './dialog-reg-auth/dialog-reg-auth.component';
import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";

import { AuthenticationService, UserService } from '../../../services';
import { User } from 'src/app/models';

@Component({
  selector: 'user-page-info',
  templateUrl: './user-page-info.component.html',
  styleUrls: ['./user-page-info.component.scss']
})
export class UserPageInfoComponent { 

  user: User | null;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    public dialog: MatDialog,) {

    this.userService.getById(this.authenticationService.userValue.id).pipe().subscribe((user) => {
      this.user = user;
    });
  }
  
  logout() {
    this.authenticationService.logout();
  }

  updateAddress(){
    const dialogRef = this.dialog.open(DialogUpdateAddressComponent, {
      backdropClass: 'backdropBackground'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.user.address = this.authenticationService.userValue.address;
    });
  }
}