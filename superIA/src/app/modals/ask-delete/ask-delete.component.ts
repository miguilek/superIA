import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-delete',
  templateUrl: './ask-delete.component.html',
  styleUrls: ['./ask-delete.component.scss']
})
export class AskDeleteComponent implements OnInit {

  close;

  constructor() { }

  ngOnInit(): void {
  }

  closeDialog(close: boolean) {
    this.close = close;
  }
}
