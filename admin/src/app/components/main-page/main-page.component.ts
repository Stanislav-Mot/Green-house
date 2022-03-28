import { Component } from '@angular/core';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

import { AuthenticationService } from '../../services'

@Component({ templateUrl: 'main-page.component.html' })
export class MainPageComponent {

    user: User | null;

    constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
    ) {
        this.authenticationService.user.subscribe((x) => { this.user = x; });
        this.user = this.authenticationService.userValue;
    }
}
