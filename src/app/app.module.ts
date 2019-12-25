import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CollaborateurComponent } from './collaborateurs/collaborateurs.component';
import { FormsModule } from '@angular/forms';
import { CollaborateurDetailsComponent } from './collaborateur-details/collaborateur-details.component';
import { MessageComponent } from './message/message.component';
import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppCollaborateurSearchComponent } from './app-collaborateur-search/app-collaborateur-search.component';
import { CollaborateurCardComponent } from './collaborateur-card/collaborateur-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSidenavModule} from '@angular/material/';
import { ReactionComponent } from './reaction/reaction.component';
import { CollabComponent } from './collab/collab.component'


@NgModule({
  declarations: [
    AppComponent,
    CollaborateurComponent,
    CollaborateurDetailsComponent,
    MessageComponent,
    DashboardComponent,
    AppCollaborateurSearchComponent,
    CollaborateurCardComponent,
    ReactionComponent,
    CollabComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
