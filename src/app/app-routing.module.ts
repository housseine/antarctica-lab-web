import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { GamesComponent } from './component/games/games/games.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { GameDetailsComponent } from './component/games/game-details/game-details.component';
import { GameCardComponent } from './component/games/game-card/game-card.component';
import { OAuth2RedirectHandlerComponent } from './authentication/oAuth2RedirectHandler/oauth2-redirect-handler/oauth2-redirect-handler.component';
import { LoginRequest } from './authentication/login/loginRequest';
import { AuthGuardService } from './common/services/auth-guard.service';
import { LoginComponent } from './authentication/login/login.component';

const routes:Routes=[
  {path:'games',component:GamesComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuardService]},
  {path:'details/:id',component:GameDetailsComponent},
  {path:'trombinogame',component:GameCardComponent},
  {path:'oauth2/redirect',component:OAuth2RedirectHandlerComponent},
  {path:'login',component:LoginComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
