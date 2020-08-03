import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { variable } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  localStorage: Storage;
  routeURL: string;
  constructor(private router: Router) {
    this.localStorage = window.localStorage;
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    var token: string;
    token = this.localStorage.getItem("accessToken");
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
