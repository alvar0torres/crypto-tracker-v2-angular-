import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { Subject } from 'rxjs';
import { TableService } from '../table/table.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements AfterViewInit, OnInit {
  id: any = null;
  historicData: any = null;
  prices: any = [];
  days: any = 1;
  currency: string = 'usd';

  newTimeFrame = new Subject<any>();

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  setTimeFrame(days: number) {
    this.days = days;
    this.newTimeFrame.next("new");
  }

  subscription = this.newTimeFrame.subscribe(
    res => this.mainFunction()
  )

  mainFunction() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.tableService.getChartData(this.id, this.days, 'usd').subscribe((res) => {
      this.historicData = res.prices;
      this.prices = [];

      this.historicData.map((coin) => {
        this.prices.push(coin[1]);
      });

      this.canvas = this.mychart.nativeElement;
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'line',
        data: {
          datasets: [
            {
              label: `Price ( Past ${this.days} days ) in USD`,
              data: this.prices,
              borderColor: "#0fbbda",
            },
          ],
          labels: this.historicData
            ? this.historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return this.days === 1 ? time : date.toLocaleDateString();
              })
            : null,
        },
      });
    });
  }

  ngAfterViewInit() {
    this.mainFunction();
  }
}
