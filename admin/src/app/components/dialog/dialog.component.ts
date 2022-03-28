import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-dialog',
    templateUrl: 'dialog.component.html',
  })
  export class DialogComponent {
    public dialogRef!: MatDialogRef<DialogComponent>

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  }
