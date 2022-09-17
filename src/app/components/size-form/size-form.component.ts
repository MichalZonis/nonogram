import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.css']
})
export class SizeFormComponent implements OnInit {

  @Input() btnText: string = ''

  constructor() { }

  ngOnInit(): void {
  }

}
