import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-offer',
    templateUrl: './offer.component.html',
    styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, OnDestroy {
    @Input() city: string;
    @Input() hotel: string;
    @Input() id: number;
    @Input() imageAuthor: string;
    @Input() price: string;
    added: boolean;
    defaultImage = 'assets/images/default.png';
    itemsChangeSub: Subscription;

    constructor(private cartService: CartService) {}

    ngOnInit() {
        this.added = this.cartService.isAdded(this.id);
        this.itemsChangeSub = this.cartService.itemsChange
        .subscribe(() => {
          this.added = this.cartService.isAdded(this.id);
        });
    }

    onClick() {
        if (!this.added) {
            this.cartService.addToCart(this.id);
            this.added = true;
        } else {
            this.cartService.removeFromCart(this.id);
            this.added = false;
        }
    }

    ngOnDestroy() {
      this.itemsChangeSub.unsubscribe();
    }
}
