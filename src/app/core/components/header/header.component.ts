import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('popoverInsertRemoveTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class HeaderComponent {
  // #region Properties (2)

  public isPopoverVisible = false;
  user$ = this.userService.getUser();

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private userService: UserService, private router: Router) {}

  // #endregion Constructors (1)

  // #region Public Methods (4)

  public hidePopover(): void {
    this.isPopoverVisible = false;
  }

  public isUserLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  public logout(): void {
    this.userService.logout();
    this.hidePopover();
    this.router.navigate(['']);
  }

  public togglePopover(event: Event): void {
    const userIcon = event.currentTarget;
    if (!(userIcon instanceof HTMLElement)) return;

    this.isPopoverVisible = !this.isPopoverVisible;
    if (this.isPopoverVisible) userIcon.focus();
    else userIcon.blur();
  }

  // #endregion Public Methods (4)
}
