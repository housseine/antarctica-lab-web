import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { GamesComponent } from './games/games.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GameDetailsComponent } from './game-details/game-details.component';
import { GameCardComponent } from './game-card/game-card.component';

const routes:Routes=[
  {path:'games',component:GamesComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'details/:id',component:GameDetailsComponent},
  {path:'trombinogame',component:GameCardComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
