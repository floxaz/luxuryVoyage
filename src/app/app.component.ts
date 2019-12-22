import { Component, OnInit } from '@angular/core';
import { CartService } from './cart/cart.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private cartService: CartService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.cartService.prepare();
  }
}
