import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  // #region Constructors (1)

  constructor(private userService: UserService, private router: Router) {}

  // #endregion Constructors (1)

  // #region Public Methods (3)

  public authGuardHandle(): boolean {
    if (this.userService.isLoggedIn()) return true;
    this.router.navigate(['']);
    return false;
  }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.authGuardHandle();
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.authGuardHandle();
  }

  // #endregion Public Methods (3)
}
