import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { TableComponent } from './table/table.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    TableComponent,
    FooterComponent,
    CoinDetailComponent,
    HomeComponentComponent,
    LineChartComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
