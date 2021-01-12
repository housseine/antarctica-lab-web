import { Component, OnInit, Input } from '@angular/core';
import { Game } from '../games/game'
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../game.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game;
  constructor(
    private route: ActivatedRoute,
    private gameService: GameService,
    private lcoaltion: Location
  ) { }

  ngOnInit() {
    this.getGameById();
  }

  getGameById(): void {
    //the operator (+) converts the string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.gameService.getGameById(id).subscribe(game => this.game = game);
  }

  goBack(): void {
    this.lcoaltion.back();
  }
  save():void{
    this.gameService.updateGame(this.game).subscribe(()=>this.goBack());
  }

}
