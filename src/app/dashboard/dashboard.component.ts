import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../collaborateur.service';
import { Collaborateur } from '../collaborateurs/collaborateur';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  collaborateurs: Collaborateur[];
  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
   this.getCollaborateur();
  }
  getCollaborateur(): void {
    this.collaborateurService.getCollaborateurs().subscribe(collaborateurs => this.collaborateurs = collaborateurs.slice(0, 5));
  }

}
