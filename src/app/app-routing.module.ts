import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { HomeComponentComponent } from './home-component/home-component.component';

const routes: Routes = [
  { path: 'coin/:id', component: CoinDetailComponent },
  { path: '', component: HomeComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
