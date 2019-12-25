import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Collaborateur } from '../collaborateurs/collaborateur';
import { CollaborateurService } from '../collaborateur.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-collaborateur-search',
  templateUrl: './app-collaborateur-search.component.html',
  styleUrls: ['./app-collaborateur-search.component.css']
})
export class AppCollaborateurSearchComponent implements OnInit {
  collaborateurs$: Observable<Collaborateur[]>;
  private searchTerms = new Subject<string>();
  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurs$=this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.collaborateurService.searchCollaborateur(term))
    );
  }

  search(term:string):void{
    this.searchTerms.next(term);
  }
}
