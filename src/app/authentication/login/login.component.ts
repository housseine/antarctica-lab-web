import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { from } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { environment } from 'src/environments/environment';
const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
  const ENDPOINT_ROOT_URL=environment.ENDPOINT_ROOT_URL;
  const BASE_URL=environment.BASE_URL;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  authenticated: any;
  localStorage: Storage;
  googleAuthUrl=""+ENDPOINT_ROOT_URL+"/oauth2/authorize/google?redirect_uri="+BASE_URL+"/oauth2/redirect";


  
  
  constructor( private loginService: LoginService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.localStorage = window.localStorage;
    this.matIconRegistry.addSvgIcon("logoGoogle", this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Google.svg"));
    this.matIconRegistry.addSvgIcon("logoFacebook",this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Facebook.svg"));
    this.matIconRegistry.addSvgIcon("logoGithub",this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Github.svg"));
  }
   
  ngOnInit() {
    
    console.log("url: "+this.googleAuthUrl);
  }

  login(email: string, password: string): void {
    var loginRequest: LoginRequest = {
      email: email,
      password: password
    }
    this.loginService.login(loginRequest).subscribe(authResponse => { this.localStorage.setItem("accessToken", authResponse.accessToken) });
    this.loginService.loginToGoogle().subscribe(access=>{console.log("my access: "+access)});
  }

}
