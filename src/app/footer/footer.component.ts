import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public date: Date;
  public year: number;

  constructor() {
    this.date = new Date();
    this.year = this.date.getFullYear();
  }

  ngOnInit(): void {}
}
