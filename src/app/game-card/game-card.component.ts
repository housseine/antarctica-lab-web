import { Component, OnInit } from '@angular/core';
import { Game } from '../games/game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.css']
})
export class GameCardComponent implements OnInit {
  games: Game[];
  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.getGame();
  }

  getGame():void{
    this.gameService.getGames().subscribe(games=>this.games=games);
  }


}
