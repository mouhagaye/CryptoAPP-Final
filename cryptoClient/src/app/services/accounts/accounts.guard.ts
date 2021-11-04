import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountsService } from './accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AccountsGuard implements CanActivate {
  constructor(
    public accountService: AccountsService,
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accountService.isLoggedIn !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['login'])
    }
    return true;
  }
  
}
