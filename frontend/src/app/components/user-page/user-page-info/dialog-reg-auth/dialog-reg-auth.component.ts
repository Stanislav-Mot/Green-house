import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService, UserService } from '../../../../services';
import { DialogUpdateAdrMesComponent } from '../dialog-message/dialog-update-adr-mes.component'
@Component({
  selector: 'app-dialog-update-address',
  templateUrl: './dialog-update-user.component.html',
  styleUrls: ['./dialog-update-user.component.scss']
})
export class DialogUpdateAddressComponent implements OnInit { 

  updateForm!: FormGroup;

  loading = false;

  submitted = false;

  returnUrl!: string;

  errorUpdate= '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private userService: UserService,
      public dialog: MatDialog,
      private authenticationService: AuthenticationService,
  ) {
  }

  openDialog() {
    this.dialog.open(DialogUpdateAddressComponent);
  }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      build: ['', Validators.required],
      entrance: ['', Validators.required],
      flat: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/user';
  }

  get getControlsUpdate() { return this.updateForm.controls; }

  updateAddress() {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.updateAddress(this.updateForm, this.authenticationService.userValue.id).pipe().subscribe(
        (address) => {
          this.dialog.closeAll();
          this.authenticationService.userValue.address = address;
          this.dialog.open(DialogUpdateAdrMesComponent, {
            backdropClass: 'backdropBackground'
          });
        },
        (error) => {
          this.errorUpdate = error;
          this.loading = false;
        },
      );
  }
}
