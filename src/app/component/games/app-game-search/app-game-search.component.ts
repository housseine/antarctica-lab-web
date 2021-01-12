import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Game } from '../games/game';
import { GameService } from '../../../game.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-search',
  templateUrl: './app-game-search.component.html',
  styleUrls: ['./app-game-search.component.css']
})
export class AppGameSearchComponent implements OnInit {
  games$: Observable<Game[]>;
  private searchTerms = new Subject<string>();
  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.games$=this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string)=>this.gameService.searchGames(term))
    );
  }

  search(term:string):void{
    this.searchTerms.next(term);
  }
}
