import { Injectable } from '@angular/core';
import { SupplyOfferService } from '../offers/offer/supply-offer.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private items = [];

    constructor(private supplyService: SupplyOfferService) {}

    supplyItems() {
        return this.items;
    }

    addToCart(id: number) {
        const item = this.supplyService.getOffer(id);
        this.items.push(item);
    }

    removeFromCart(id: number) {
        this.items.splice(id, 1);
    }
}