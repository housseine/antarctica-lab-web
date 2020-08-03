import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import { from } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
const googleLogoURL =
  "https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  authenticated: any;
  localStorage: Storage;
  constructor(private location: Location, private loginService: LoginService, private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {
    this.localStorage = window.localStorage;
    this.matIconRegistry.addSvgIcon("logoGoogle", this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Google.svg"));
    this.matIconRegistry.addSvgIcon("logoFacebook",this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Facebook.svg"));
    this.matIconRegistry.addSvgIcon("logoGithub",this.domSanitizer.bypassSecurityTrustResourceUrl("/assets/img/general/Github.svg"));
  }

  ngOnInit() {

  }

  login(email: string, password: string): void {
    var loginRequest: LoginRequest = {
      email: email,
      password: password
    }
    this.loginService.login(loginRequest).subscribe(authResponse => { this.localStorage.setItem("accessToken", authResponse.accessToken) });
  }

}