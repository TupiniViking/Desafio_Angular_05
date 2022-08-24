import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // #region Properties (1)

  private userSubject = new BehaviorSubject<User>({});

  // #endregion Properties (1)

  // #region Constructors (1)

  constructor(private tokenService: TokenService, private router: Router) {
    if (this.tokenService.hasToken()) {
      this.updateUser();
    }
  }

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public isLoggedIn(): boolean {
    return this.tokenService.hasToken();
  }

  public logout(): void {
    this.tokenService.deleteToken();
    this.userSubject.next({});
    this.router.navigate(['/']);
  }

  public setUserToken(token: string): void {
    this.tokenService.setToken(token);
    this.updateUser();
  }

  // #endregion Public Methods (4)

  // #region Private Methods (1)

  private updateUser(): void {
    const token = this.tokenService.getToken();
    const user = jwt_decode(token) as User;
    this.userSubject.next(user);
  }

  // #endregion Private Methods (1)
}
