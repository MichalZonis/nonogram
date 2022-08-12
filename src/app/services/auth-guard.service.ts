import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    ) {}

  canActivate(state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
    return true;
  }
}
