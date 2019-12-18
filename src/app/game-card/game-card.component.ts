import { Component, OnInit } from '@angular/core';
import { Game } from '../games/game';
import { GameService } from '../game.service';
// declare var $: any;
//declare const bubbles: any;
// declare var callBubller: any;
declare const bubblechart: any;
import * as d3 from 'd3';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
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
