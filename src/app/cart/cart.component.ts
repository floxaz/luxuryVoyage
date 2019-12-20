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
    quantitySubscription: Subscription;

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit() {
        this.items = this.cartService.supplyItems();
        this.itemsQuantity = this.cartService.quantifyItems();
        this.quantitySubscription = this.cartService.itemsQuantityChanged.subscribe((quantity: number) => {
            this.itemsQuantity = quantity;
        });
        this.calcTotal();
    }

    ngOnDestroy() {
        this.quantitySubscription.unsubscribe();
    }

    calcTotal() {
        this.total = 0;
        this.items.forEach(item => {
            this.total += item.price;
        });
    }

    onRemove(id: number) {
        this.cartService.removeFromCart(id);
        this.calcTotal();
    }

    onBuy() {
        this.router.navigate(['login']);
    }
}
