import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'
import { CartService } from '../cart/cart.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    isHome: boolean;
    itemsQuantity: number;
    constructor(private router: Router, private cartService: CartService) {}

    ngOnInit() {
        this.itemsQuantity = this.cartService.quantifyItems();
        
        this.cartService.itemsQuantityChanged.subscribe((quantity: number) => {
            this.itemsQuantity = quantity;
        });

        this.router.events.subscribe(event => {
            if(event instanceof NavigationEnd) {
                if(event.url !== '/') {
                    this.isHome = false;
                } else {
                    this.isHome = true;
                }
            }
        });
    }
}