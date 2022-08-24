import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { AutoLoginService } from 'src/app/core/services/auto-login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate(100, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginFormComponent implements OnInit, OnDestroy {
  // #region Properties (8)

  private _authSub = new Subscription();
  private _autoLogin = false;

  public isPasswordShown = false;
  public isSigningIn = false;
  public isTooltipVisible = false;
  public password = '';
  public passwordType: 'password' | 'text' = 'password';
  public user = '';

  // #endregion Properties (8)

  // #region Constructors (1)

  constructor(
    private authService: AuthService,
    private autoLoginService: AutoLoginService,
    private router: Router
  ) {}

  // #endregion Constructors (1)

  // #region Public Accessors (2)

  public get autoLogin() {
    return this._autoLogin;
  }

  public set autoLogin(value) {
    this._autoLogin = value;
    this.autoLoginService.setAutoLogin(this._autoLogin);
  }

  // #endregion Public Accessors (2)

  // #region Public Methods (7)

  public hideTooltip(): void {
    this.isTooltipVisible = false;
  }

  public login(): void {
    this.isSigningIn = true;
    this._authSub = this.authService
      .auth(this.user, this.password)
      .pipe(finalize(() => (this.isSigningIn = false)))
      .subscribe({
        complete: () => this.router.navigate(['home']),
        error: (err) =>
          alert(
            err.status
              ? 'Usuário ou senha inválidos'
              : 'Sem resposta do servidor'
          ),
      });
  }

  public ngOnDestroy(): void {
    this._authSub.unsubscribe();
  }

  public ngOnInit(): void {
    this._autoLogin = this.autoLoginService.isAutoLoginEnabled();
  }

  public showTooltip(): void {
    this.isTooltipVisible = true;
  }

  public toggleShowPassword(): void {
    this.isPasswordShown = !this.isPasswordShown;
    this.passwordType = this.isPasswordShown ? 'text' : 'password';
  }

  public toggleTooltip(): void {
    this.isTooltipVisible = !this.isTooltipVisible;
  }

  // #endregion Public Methods (7)
}
