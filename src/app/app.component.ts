import { Component, OnInit, Pipe } from '@angular/core';
import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';
import { LangService } from './shared/lang.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private translate: TranslateService,
    private langService: LangService
  ) { }

  ngOnInit() {
    this.setLanguage();
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      if (user) {
        this.cartService.resetSupply();
        this.cartService.prepare();
        this.langService.getLang();
      }
    });

    this.authService.loggedOut.subscribe(() => {
      this.langService.saveUserLang();
    });
  }

  setLanguage() {
    let defaultLang = 'en';
    if (navigator.language === 'it-IT' || navigator.language === 'it') {
      defaultLang = 'it';
    }
    this.translate.setDefaultLang(defaultLang);
  }
}
