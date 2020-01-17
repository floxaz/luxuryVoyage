import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CartService } from '../cart/cart.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isHome: boolean;
  itemsQuantity = 0;
  authenticated = false;
  quantitySub: Subscription;
  email: string = null;
  constructor(private router: Router, private cartService: CartService, private authService: AuthService) { }

  ngOnInit() {
    this.itemsQuantity = this.cartService.quantifyItems();

    this.authService.user.subscribe((user: User) => {
      if (user) {
        this.authenticated = true;
        this.email = user.email;
      } else {
        this.authenticated = false;
      }
    });

    this.quantitySub = this.cartService.itemsQuantityChanged.subscribe((quantity: number) => {
      this.itemsQuantity = quantity;
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url !== '/') {
          this.isHome = false;
        } else {
          this.isHome = true;
        }
      }
    });
  }

  onLogout() {
    this.authService.logout();
  }

  // I decided to implemented it even though header never gets destroyed in this application
  ngOnDestroy() {
    this.quantitySub.unsubscribe();
  }
}
