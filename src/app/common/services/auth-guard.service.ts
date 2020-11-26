import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  localStorage: Storage;
  sessionStorage: Storage;
  routeURL: string;
  constructor(private router: Router) {
    this.localStorage = window.localStorage;
    this.sessionStorage=window.sessionStorage;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var token: string;
    token = this.sessionStorage.getItem("acc");
    console.log("le token"+token)
    if (!token && this.routeURL !== '/login') {
      console.log("im in");
      this.router.navigate(['/login'], {
        queryParams: {
          return: 'login'
        }
      });
      return false;
    } else return true;
  }
}
