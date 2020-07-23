import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';
import { AuthResponse } from './authResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = '/api/auth/login';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService,) { }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post(this.loginUrl + "/", loginRequest, this.httpOptions).pipe(
      tap((newResp:AuthResponse) => this.log(`LoginService: fetched token`)),
      catchError(this.handleError<AuthResponse>(`login`))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  };
  private log(message: string) {
    this.messageService.add(message);
  }
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
