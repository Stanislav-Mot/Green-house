import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-update-adr-mes',
  templateUrl: './dialog-update-adr-mes.component.html',
  styleUrls: ['./dialog-update-adr-mes.component.scss']
})
export class DialogUpdateAdrMesComponent {

    constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: {message: string}
    ) { 
    }

    backTo(){
        this.dialog.closeAll();
    }
 }
