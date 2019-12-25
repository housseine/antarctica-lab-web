import { Injectable } from '@angular/core';
import { Collaborateur } from './collaborateurs/collaborateur';
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { catchError, map, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CollaborateurService {

  private collaborateurUrl = '/api/collaborateurs';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ) {
  }
  getCollaborateurs(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(this.collaborateurUrl + '/getall').pipe(
      tap(_ => this.log('fetched collaborateur')),
      catchError(this.handleError<Collaborateur[]>('getCollaborateurs', []))
    );
  }
  getCollaborateurById(id: number): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(this.collaborateurUrl+"/" + id).pipe(
      tap(_ => this.log(`collaborateurService: fetched collaborateur ${id}`)),
      catchError(this.handleError<Collaborateur>(`getCollaborateurById id=${id}`))
    );
  }

  updateCollaborateur(collaborateur: Collaborateur): Observable<any> {
    return this.http.patch<Collaborateur>(this.collaborateurUrl+"/", collaborateur, this.httpOptions).pipe(
      tap(_ => this.log(`Updated collaborateur ${collaborateur.id}`)),
      catchError(this.handleError<any>('updateCollaborateur'))
    );
  }

  addCollaborateur(collaborateur: Collaborateur): Observable<Collaborateur> {
    return this.http.post(this.collaborateurUrl+"/", collaborateur, this.httpOptions).pipe(
      tap((newCollaborateur: Collaborateur) => this.log(`Posted collaborateur ${newCollaborateur.id}`)),
      catchError(this.handleError<Collaborateur>('addCollaborateur'))
    );
  }

  deleteCollaborateur(collaborateur: Collaborateur): Observable<any> {
    const url = this.collaborateurUrl+"/" + collaborateur.id;
    return this.http.delete<Collaborateur>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted collaboratur ${collaborateur.id}`)),
      catchError(this.handleError<Collaborateur>('deleteCollaboratur'))
    )
  }

  searchCollaborateur(term:string):Observable<Collaborateur[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Collaborateur[]>(`${this.collaborateurUrl}?term=${term}`).pipe(
      tap(_ => this.log(`found collaborateurs matching "${term}"`)),
      catchError(this.handleError<Collaborateur[]>('searchCollaborateurs',[]))
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
}
