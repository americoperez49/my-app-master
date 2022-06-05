import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-snack-bar',
  templateUrl: './my-snack-bar.component.html',
  styleUrls: ['./my-snack-bar.component.scss']
})
export class MySnackBarComponent implements OnInit {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) { }
  status:any
  ngOnInit(): void {
    this.status = this.data;
  }

}
