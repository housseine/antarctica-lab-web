import { Injectable } from '@angular/core';
import { Game } from './component/games/games/game';
import { GAMES } from './component/games/games/games-mock';
import { Observable, of, throwError } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap, retry } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { GlobalService } from './common/services/global.service';
const BASE_API_URL = environment.ENDPOINT_ROOT_URL;
@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = BASE_API_URL + '/games';
  constructor(private globalService: GlobalService) {}

  getGames(): Observable<Game[]> {
    return this.globalService.getAllObjects(this.gameUrl);
  }
  getGameById(id: number): Observable<Game> {
    return this.globalService.getObjectById(this.gameUrl, id);
  }
  updateGame(game: Game): Observable<any> {
    return this.globalService.updateObject(this.gameUrl, game);
  }
  addGame(game: Game): Observable<Game> {
    return this.globalService.addObject(this.gameUrl, game);
  }
  deleteGame(game: Game): Observable<any> {
    return this.globalService.deleteObject(this.gameUrl, game);
  }

  searchGames(term: string): Observable<Game[]> {
    return this.globalService.searchObjectsByTerm(this.gameUrl, term);
  }

}
