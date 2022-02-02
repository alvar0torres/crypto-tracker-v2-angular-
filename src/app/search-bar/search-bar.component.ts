import { Component, OnInit } from '@angular/core';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchInput: string = "";

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
  }

  onSearchChange(searchValue: any): void {
    this.tableService.filterCoins(searchValue.target.value);
  }


}
