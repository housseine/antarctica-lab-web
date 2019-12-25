import { Component, OnInit, Input } from '@angular/core';
import { Collaborateur } from '../collaborateurs/collaborateur'
import { ActivatedRoute } from '@angular/router';
import { CollaborateurService } from '../collaborateur.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-collaborateur-details',
  templateUrl: './collaborateur-details.component.html',
  styleUrls: ['./collaborateur-details.component.css']
})
export class CollaborateurDetailsComponent implements OnInit {
  collaborateur: Collaborateur;
  constructor(
    private route: ActivatedRoute,
    private collaborateurService: CollaborateurService,
    private lcoaltion: Location
  ) { }

  ngOnInit() {
    this.getCollaborateurById();
  }

  getCollaborateurById(): void {
    //the operator (+) converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.collaborateurService.getCollaborateurById(id).subscribe(collaborateur => this.collaborateur = collaborateur);
  }

  goBack(): void {
    this.lcoaltion.back();
  }
  save():void{
    this.collaborateurService.updateCollaborateur(this.collaborateur).subscribe(()=>this.goBack());
  }

}
