import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';

export interface Coin {
  id: string;
  name: string;
  price: number;
  oneDayChange: number;
  marketCap: number;
  symbol: string;
  image: string;
}

export interface RawCoin {
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string;
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  roi: any;
  symbol: string;
  total_supply: number;
  total_volume: number;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  filteredCoinsSubject = new Subject<Coin[]>();

  coinsSubject = new Subject<any[]>();

  allCoins: Coin[] = [];

  constructor(private http: HttpClient) {}

  getChartData(id: any, days: any, currency: any) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`
    );
  }

  getCoinInfo(id: string | null) {
    return this.http.get<any>(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );
  }

  filterCoins(searchTerm: string) {
    let filteredCoins = this.allCoins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.filteredCoinsSubject.next(filteredCoins);
  }

  fetchCoins() {
    return this.http
      .get<RawCoin[]>(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
      )
      .pipe(
        tap((allData) => {
          let coins: any[] = [];

          allData.map((coin: RawCoin): void => {
            coins.push({
              id: coin.id,
              name: coin.name,
              price: coin.current_price,
              oneDayChange: coin.price_change_percentage_24h,
              marketCap: coin.market_cap,
              image: coin.image,
              symbol: coin.symbol.toUpperCase(),
            });
          });

          this.allCoins = coins;
          this.coinsSubject.next(coins);
        })
      );
  }
}
