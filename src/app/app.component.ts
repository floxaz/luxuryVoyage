import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';
import { TranslationService } from './shared/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private translationService: TranslationService
  ) { }

  ngOnInit() {
    this.translationService.getJSON();
    this.authService.autoLogin();
    this.authService.user.subscribe(user => {
      if (user) {
        this.cartService.resetSupply();
        this.cartService.prepare();
      }
    });
  }
}
