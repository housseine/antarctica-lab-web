import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../games/game';
declare var $: any;
declare const bubbles:any;
//declare var bubbler;
@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  games: Game[];
  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.getGames();
   
  }

  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }
}
