import { Component, OnDestroy, OnInit } from '@angular/core';
import { Coin, TableService } from './table.service';

@Component({
  selector: 'app-table',
  styleUrls: ['table.component.css'],
  templateUrl: 'table.component.html',
})
export class TableComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['Name', 'Price', '24h %', 'Market Cap'];
  isLoading: boolean = false;
  dataSource: Coin[] = [];
  subscription: any = this.tableService.coinsSubject.subscribe((coins) => {
    this.dataSource = coins;
  });
  filterSubscription: any = this.tableService.filteredCoinsSubject.subscribe(
    (coins) => {
      this.dataSource = coins;
    }
  );

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.isLoading = true;
    this.tableService.fetchCoins().subscribe(
      res => this.isLoading = false
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.filterSubscription.unsubscribe();
  }
}
