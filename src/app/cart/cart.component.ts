import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
    items = [];
    itemsQuantity: number = 0;
    total: number = 0;

    constructor(private cartService: CartService, private router: Router) {}

    ngOnInit() {
        this.items = this.cartService.supplyItems();
        this.itemsQuantity = this.cartService.quantifyItems();
        this.cartService.itemsQuantityChanged.subscribe((quantity: number) => {
            this.itemsQuantity = quantity;
        })
        this.calcTotal();
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