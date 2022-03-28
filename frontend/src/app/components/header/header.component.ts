import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogRegAuthComponent } from './../../components/dialog-authentication/dialog-reg-auth/dialog-reg-auth.component';
import { User } from 'src/app/models';
import { UserService, AuthenticationService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  user: User | null;


  constructor(
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private userService: UserService,) {
      this.authenticationService.user.subscribe((x) => { this.user = x; });
      this.user = this.authenticationService.userValue;
}

  regAuth(): void {
  this.dialog.open(DialogRegAuthComponent, {

                data: {message: 'Category added',},
                backdropClass: 'backdropBackground'
            });
  }
}
