import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { DialogMessageComponent } from '../dialog-message/dialog-message.component'
import { AuthenticationService, UserService } from '../../../services';
import { from } from 'rxjs';
@Component({
  selector: 'app-dialog-reg-auth',
  templateUrl: './dialog-reg-auth.component.html',
  styleUrls: ['./dialog-reg-auth.component.scss']
})
export class DialogRegAuthComponent implements OnInit { 

  authForm!: FormGroup;

  regForm!: FormGroup;

  loading = false;

  submitted = false;

  returnUrl!: string;

  errorAuth = '';

  errorReg = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      public dialog: MatDialog
  ) {
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  openDialog() {
    this.dialog.open(DialogRegAuthComponent);
  }

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.authForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/user';
  }

  get getControls() { return this.authForm.controls; }

  get getControlsReg() { return this.authForm.controls; }

  authSubmit() {

    if (this.authForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(
      this.getControls.email.value,
      this.getControls.password.value
      ).pipe(first()).subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
          this.dialog.closeAll();
          this.submitted = true;
        },
        (error) => {
          this.errorAuth = error;
          this.loading = false;
          this.submitted = true;

        },
      );
  }

  regSubmit() {
    this.submitted = true;

    if (this.regForm.invalid) {
      return;
    }

    this.loading = true;
    this.userService.create(this.regForm).pipe(first()).subscribe(
        () => {
          this.dialog.closeAll();
          this.dialog.open(DialogMessageComponent, {
            backdropClass: 'backdropBackground'
          });
        },
        (error) => {
          this.errorReg = error;
          this.loading = false;
        },
      );
  }
}
