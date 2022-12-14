import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenAuthInterceptor } from './interceptors/token-auth.interceptor';

@NgModule({
  declarations: [HeaderComponent, MenuComponent],
  imports: [CommonModule, RouterModule, SharedModule],
  exports: [HeaderComponent, MenuComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  // #region Constructors (1)

  constructor(@Optional() @SkipSelf() core: CoreModule) {
    if (core) {
      throw new Error('Core module should only be imported in root module');
    }
  }

  // #endregion Constructors (1)
}
