import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Router, Routes, Route } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('menuAppearDisappear', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('350ms ease-in-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)' }),
        animate('350ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('overlayAppearDisappear', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('250ms 100ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('250ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class MenuComponent {
  // #region Properties (2)

  public isMenuVisible = false;
  public paths = this.filterNavigablePaths(this.router.config);

  // #endregion Properties (2)

  // #region Constructors (1)

  constructor(private router: Router) {}

  // #endregion Constructors (1)

  // #region Public Methods (1)

  public toggleMenu(): void {
    this.isMenuVisible = !this.isMenuVisible;
  }

  // #endregion Public Methods (1)

  // #region Private Methods (1)

  private filterNavigablePaths(routes: Routes): string[] {
    return routes
      .map((route: Route) => route.path ?? '')
      .filter((path) => path && path !== 'login');
  }

  // #endregion Private Methods (1)
}
