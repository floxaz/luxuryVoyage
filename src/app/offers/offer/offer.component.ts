import { Component, Input } from '@angular/core';
import { CartService } from '../../cart/cart.service';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss']
})
export class OfferComponent {
    @Input() city: string;
    @Input() hotel: string;
    @Input() image: string;
    @Input() imageAuthor: string;
    @Input() price: string;
    @Input() id: number;

    constructor(private cartService: CartService) {}

    onAdd() {
        this.cartService.addToCart(this.id);
    }
}