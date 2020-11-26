import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-oauth2-redirect-handler',
  templateUrl: './oauth2-redirect-handler.component.html',
  styleUrls: ['./oauth2-redirect-handler.component.css']
})
export class OAuth2RedirectHandlerComponent implements OnInit {
  private sessionStorage: Storage;
  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService
  ) {
    this.sessionStorage = window.sessionStorage;
  }

  ngOnInit() {
    var token: any;
    token = this.route.snapshot.queryParamMap.get("token");
    console.log("social token: " + token);
    this.loginService.sendToken(token).subscribe(access => { this.sessionStorage.setItem("acc", "" + access.tokenCookiePayLoad) });
  }

}
