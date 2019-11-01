import { Component, Input, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnDestroy {
    @Input() city: string;
    @Input() hotel: string;
    @Input() image: string;
    @Input() imageAuthor: string;
    @Input() price: string;
    @Input() id: number;
    added: boolean = false;

    constructor(private cartService: CartService) {}

    ngOnDestroy() {
        console.log('fuck...');
    }

    onAdd() {
        if(!this.added) {
            this.cartService.addToCart(this.id);
            this.added = true;
        } 
    }
}