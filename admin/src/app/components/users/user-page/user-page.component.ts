import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';

import { UserService } from 'src/app/services';
import { User } from 'src/app/models';
@Component({
    selector: 'app-page-user',
    templateUrl: 'user-page.component.html',
    styleUrls: ['user-page.component.scss']
})
export class UserPageComponent implements OnInit {

    returnUrl!: string;

    user!: User | undefined;

    role!: string;

    constructor(
        private _location: Location,
        private route: ActivatedRoute,
        private userService: UserService,
    ) {
        
    }

    ngOnInit() {
        const idUser = this.route.snapshot.params.id;
        this.userService.getById(idUser).pipe().subscribe((user) => {
            this.user = user;
            this.role = user.roles[0];
        });
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
      }

      backClicked() {
        this._location.back();
    }
 }
