import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../games/game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  games: Game[];
  constructor(private gameService: GameService,private route: ActivatedRoute) { }

  ngOnInit() {
   this.getGames();
   var token: any;
   token = this.route.root.firstChild.snapshot.data;
   console.log("my token: "+token);
  }
  
  getGames(): void {
    this.gameService.getGames().subscribe(games => this.games = games.slice(0, 5));
    console.log("all games: "+this.games);
  }

}
