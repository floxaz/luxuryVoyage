import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';
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
    private translate: TranslateService
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      if (user) {
        this.cartService.resetSupply();
        this.cartService.prepare();
      }
    });
  }
}
