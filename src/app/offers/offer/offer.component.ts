import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
    @Input() city: string;
    @Input() hotel: string;
    @Input() id: number;
    @Input() imageAuthor: string;
    @Input() price: string;
    added: boolean;
    defaultImage = 'assets/images/default.png';

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.added = this.cartService.isAdded(this.id);
    }

    onClick() {
        if(!this.added) {
            this.cartService.addToCart(this.id);
            this.added = true;
        } else {
            this.cartService.removeFromCart(this.id);
            this.added = false;
        }
    }
}