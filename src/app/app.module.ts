import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { GamesComponent } from './games/games.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GameDetailsComponent } from './game-details/game-details.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppGameSearchComponent } from './app-game-search/app-game-search.component';
import { GameCardComponent } from './game-card/game-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule,MatFormFieldModule, MatInputModule } from '@angular/material';
import {FlexLayoutModule } from '@angular/flex-layout';
import { SocialLoginComponent } from './social-login/social-login.component';
import { LoginComponent } from './authentication/login/login.component';
import { OAuth2RedirectHandlerComponent } from './authentication/oAuth2RedirectHandler/oauth2-redirect-handler/oauth2-redirect-handler.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameDetailsComponent,
    MessageComponent,
    DashboardComponent,
    AppGameSearchComponent,
    GameCardComponent,
    SocialLoginComponent,
    LoginComponent,
    OAuth2RedirectHandlerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
