import { Component } from "@angular/core";

import { AuthenticationService, UserService } from "../../services";
import { Role } from "../../enums";
import { User } from "../../models";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
  })
export class HeaderComponent {
    user: User | null;

    loading = false;

    userFromApi: User | undefined;


    constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
    ) {
        this.authenticationService.user.subscribe((x) => { this.user = x; });
        this.user = this.authenticationService.userValue;
    }

    logout() {
      this.authenticationService.logout();
    }
}
