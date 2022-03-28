import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-message',
  templateUrl: './dialog-message.component.html',
  styleUrls: ['./dialog-message.component.scss']
})
export class DialogMessageComponent {

    constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {message: string}
    ) { 
    }

    backTo(){
        this.dialog.closeAll();
    }
 }
