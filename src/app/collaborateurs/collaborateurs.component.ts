import { Component, OnInit } from '@angular/core';
import { Collaborateur } from './collaborateur';
import { CollaborateurService } from '../collaborateur.service';


@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})
export class CollaborateurComponent implements OnInit {

  collaborateurs: Collaborateur[];

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.getCollaborateurs()
  }


  getCollaborateurs(): void {
    this.collaborateurService.getCollaborateurs().subscribe(collaborateurs => this.collaborateurs = collaborateurs);
  }

  addCollaborateur(collaborateurName: string, collaborateurDescription: string, collaborateurComment: string, collaborateurRate: number): void {
    collaborateurName = collaborateurName.trim();
    collaborateurDescription = collaborateurDescription.trim();
    collaborateurComment = collaborateurComment.trim();
    var collaborateur: Collaborateur = {
      id: null,
      name: collaborateurName,
      description: collaborateurDescription,
      comment: collaborateurComment,
      rate: collaborateurRate
    }

    this.collaborateurService.addCollaborateur(collaborateur).subscribe(collaborateur => { this.collaborateurs.push(collaborateur) });
  }
deleteCollaborateur(collaborateur:Collaborateur){
  this.collaborateurs=this.collaborateurs.filter(g=>g!==collaborateur);
  this.collaborateurService.deleteCollaborateur(collaborateur).subscribe();
}
}
