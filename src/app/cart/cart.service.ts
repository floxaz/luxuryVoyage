import { Injectable, EventEmitter } from '@angular/core';
import { SupplyOfferService } from '../offers/offer/supply-offer.service';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private items = [];
    itemsQuantityChanged = new EventEmitter<number>();

    constructor(private supplyService: SupplyOfferService) {}

    supplyItems() {
        return this.items;
    }

    quantifyItems() {
        return this.items.length;
    }

    addToCart(id: number) {
        const item = this.supplyService.getOffer(id);
        this.items.push(item);
        this.itemsQuantityChanged.emit(this.items.length);
    }

    removeFromCart(id: number) {
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
        this.itemsQuantityChanged.emit(this.items.length);
    }

    isAdded(id: number) {
        const foundItems = this.items.filter(item => item.id === id);
        return foundItems.length > 0;
    }
}