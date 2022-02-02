import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
})
export class CoinDetailComponent implements OnInit {
  id: string | null = 'something';

  isLoading: boolean = false;

  coin: { description: string; name: string; image: any } = {
    description: '',
    name: '',
    image: '',
  };

  constructor(
    private route: ActivatedRoute,
    private tableService: TableService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.id = this.route.snapshot.paramMap.get('id');

    this.tableService.getCoinInfo(this.id).subscribe((res) => {
      this.isLoading = false;
      this.coin.description = res.description.en.split('. ')[0];
      this.coin.name = res.name;
      this.coin.image = res.image.large;

      console.log(this.coin);
    });
  }
}
