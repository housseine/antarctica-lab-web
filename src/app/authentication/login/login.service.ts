import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { LoginRequest } from './loginRequest';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { MessageService } from 'src/app/message.service';
import { AuthResponse } from './authResponse';
import { TokenPayLoad } from './TokenPayLoad';
import { environment } from 'src/environments/environment';
const BASE_API_URL = environment.ENDPOINT_ROOT_URL
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = BASE_API_URL + '/auth/login';
  private loginGoogleUrl = BASE_API_URL + '/auth/logingoogle'
  private sendTokenUrl = BASE_API_URL + '/auth/sendToken'

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  constructor(private http: HttpClient, private messageService: MessageService,) { }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    return this.http.post(this.loginUrl + "/", loginRequest, this.httpOptions).pipe(
      tap((newResp: AuthResponse) => this.log(`LoginService: fetched token`)),
      catchError(this.handleError<AuthResponse>(`login`))
    );
  }

  sendToken(token: string): Observable<TokenPayLoad> {
    return this.http.get<TokenPayLoad>(`${this.sendTokenUrl}?token=${token}`, this.httpOptions).pipe(
      // map((response: any) => {
      //   response.body("helo");
      //   console.log("maaaaaap"+response);
      //   return response;
      // }),
      tap((newResp: TokenPayLoad) => this.log(`LoginService: sent token`)),
      catchError(this.handleError<TokenPayLoad>(`login`)),

    );
  }

  loginToGoogle(): Observable<boolean> {
    return this.http.get(this.loginGoogleUrl + "/", this.httpOptions).pipe(
      tap((newResp: boolean) => this.log(`LoginService: fetched token google`)),
      catchError(this.handleError<boolean>(`login`))
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
