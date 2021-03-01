import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  public getObjectById<T>(url: string, id: number): Observable<T> {
    return this.http.get<T>(url + "/" + id, this.httpOptions).pipe(
      tap(_ => this.log(`Service: fetched object ${id}`)),
      catchError(this.handleError<T>(`getObjectById id=${id}`))
    );
  }

  public getAllObjects<T>(url: string,param?: any): Observable<T[]> {
    if(!param){ param=""}
    return this.http.get<T[]>(url + '/'+param, this.httpOptions).pipe(
      tap(_ => this.log('fetched all')),
      retry(1),
      catchError(this.handleErrors)
    );
  }

  public updateObject<T>(url: string, parameter: any): Observable<T> {
    return this.http.patch<T>(url + "/", parameter, this.httpOptions).pipe(
      tap(_ => this.log(`Updated Object ${parameter}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  public addObject<T>(url: string, parameter: any): Observable<T> {
    return this.http.post(url + "/", parameter, this.httpOptions).pipe(
      tap((newObject: any) => this.log(`Posted  ${newObject}`)),
      catchError(this.handleError<T>('add'))
    );
  }

  public deleteObject<T>(url: string, parameter: any): Observable<T> {
    return this.http.delete<T>(url+"/"+parameter.id, this.httpOptions).pipe(
      tap(_ => this.log(`deleted object ${parameter}`)),
      catchError(this.handleError<T>('deleteObject'))
    );
  }

  public searchObjectsByTerm<T>(url: string, term: string): Observable<T[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<T[]>(`${url}?term=${term}`,this.httpOptions).pipe(
      tap(_ => this.log(`found objects matching "${term}"`)),
      catchError(this.handleError<T[]>('searchObjects', []))
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
