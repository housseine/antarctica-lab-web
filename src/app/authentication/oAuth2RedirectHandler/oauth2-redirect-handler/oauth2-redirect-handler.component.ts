import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-oauth2-redirect-handler',
  templateUrl: './oauth2-redirect-handler.component.html',
  styleUrls: ['./oauth2-redirect-handler.component.css']
})
export class OAuth2RedirectHandlerComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    var token: any;
    token = this.route.snapshot.queryParamMap.get("token");
    console.log("social token: " + token);
  }

}
