import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router'
import { CollaborateurComponent } from './collaborateurs/collaborateurs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CollaborateurDetailsComponent } from './collaborateur-details/collaborateur-details.component';
import { CollaborateurCardComponent } from './collaborateur-card/collaborateur-card.component';

const routes:Routes=[
  {path:'collaborateurs',component:CollaborateurComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'trombinoscope',component:CollaborateurCardComponent},
  {path:'details/:id',component:CollaborateurDetailsComponent},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
