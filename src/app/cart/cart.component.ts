import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  items = [];
  itemsQuantity = 0;
  total = 0;
  supplySubscription: Subscription;
  itemsChangeSub: Subscription;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.itemsQuantity = this.items.length;
    this.calcTotal();

    this.itemsChangeSub = this.cartService.itemsChange.subscribe(items => {
      this.items = items;
      this.itemsQuantity = items.length;
      this.calcTotal();
    });
  }

  ngOnDestroy() {
    if (this.supplySubscription) {
      this.supplySubscription.unsubscribe();
    }
    this.itemsChangeSub.unsubscribe();
  }

  calcTotal() {
    this.total = 0;
    this.items.forEach(item => {
      this.total += item.price;
    });
  }

  onRemove(id: number) {
    this.cartService.removeFromCart(id);
  }

  onBuy() {
    this.router.navigate(['purchase']);
  }
}
