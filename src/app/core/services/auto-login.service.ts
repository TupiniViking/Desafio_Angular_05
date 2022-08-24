import { Injectable } from '@angular/core';

const KEY = 'autoLogin';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginService {
  // #region Public Methods (2)

  public isAutoLoginEnabled(): boolean {
    return localStorage.getItem(KEY) === 'true';
  }

  public setAutoLogin(value: boolean) {
    localStorage.setItem(KEY, String(value));
  }

  // #endregion Public Methods (2)
}
