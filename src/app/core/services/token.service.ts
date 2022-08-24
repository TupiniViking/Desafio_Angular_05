import { Injectable } from '@angular/core';

const KEY = 'token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // #region Public Methods (4)

  public deleteToken(): void {
    localStorage.removeItem(KEY);
  }

  public getToken(): string {
    return localStorage.getItem(KEY) ?? '';
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }

  public setToken(token: string): void {
    localStorage.setItem(KEY, token);
  }

  // #endregion Public Methods (4)
}
