import { Component, OnInit } from '@angular/core';
import { Game } from './game';
import { GAMES } from './games-mock'
import { GameService } from '../../../game.service';
import { R3TargetBinder } from '@angular/compiler';


@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  games: Game[];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames()
  }


  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games);
  }

  addGame(gameName: string, gameDescription: string, gameComment: string, gameRate: number): void {
    gameName = gameName.trim();
    gameDescription = gameDescription.trim();
    gameComment = gameComment.trim();
    var game: Game = {
      id: null,
      name: gameName,
      description: gameDescription,
      comment: gameComment,
      rate: gameRate
    }

    this.gameService.addGame(game).subscribe(game => { this.games.push(game) });
  }
deleteGame(game:Game){
  this.games=this.games.filter(g=>g!==game);
  this.gameService.deleteGame(game).subscribe();
}
}
