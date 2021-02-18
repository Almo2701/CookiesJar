import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data:{mensaje:string},
    public DialogRef:MatDialogRef<DialogComponent>
    ) {

   }

  ngOnInit(): void {
  }
closeDialog(){
  this.DialogRef.close();
}
}
