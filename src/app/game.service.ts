import { Injectable } from '@angular/core';
import { Game } from './games/game';
import { GAMES } from './games/games-mock';
import { Observable, of, throwError } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'https://antarctica-lab.herokuapp.com/games';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {
  }
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameUrl + '/getall').pipe(
      tap(_ => this.log('fetched games')),
      retry(1),
      catchError(this.handleErrors)
    );
  }
  getGameById(id: number): Observable<Game> {
    return this.http.get<Game>(this.gameUrl+"/" + id).pipe(
      tap(_ => this.log(`GameService: fetched game ${id}`)),
      catchError(this.handleError<Game>(`getGameById id=${id}`))
    );
  }

  updateGame(game: Game): Observable<any> {
    return this.http.patch<Game>(this.gameUrl+"/", game, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Game ${game.id}`)),
      catchError(this.handleError<any>('updateGame'))
    );
  }

  addGame(game: Game): Observable<Game> {
    return this.http.post(this.gameUrl+"/", game, this.httpOptions).pipe(
      tap((newGame: Game) => this.log(`Posted game ${newGame.id}`)),
      catchError(this.handleError<Game>('addGame'))
    );
  }

  deleteGame(game: Game): Observable<any> {
    const url = this.gameUrl+"/" + game.id;
    return this.http.delete<Game>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted game ${game.id}`)),
      catchError(this.handleError<Game>('deleteGame'))
    )
  }

  searchGames(term:string):Observable<Game[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Game[]>(`${this.gameUrl}?term=${term}`).pipe(
      tap(_ => this.log(`found games matching "${term}"`)),
      catchError(this.handleError<Game[]>('searchGames',[]))
    );
  }

  private log(message: string) {
    this.messageService.add(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  };

  handleErrors(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
