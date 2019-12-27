import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SupplyOfferService } from '../offers/offer/supply-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Offer } from '../offers/offer/offer.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  private url = 'https://luxuryvoyage1-9d7d0.firebaseio.com/cart/';
  itemsQuantityChanged = new Subject<number>();
  itemsChange = new Subject<any>();
  supplied = false;

  constructor(
    private supplyService: SupplyOfferService,
    private http: HttpClient, private authService: AuthService) { }

  supplyItems() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<{ [key: string]: Offer[] }>(`${this.url}${user.id}.json?auth=${user.getToken()}`)
        .pipe(map(response => {
          this.supplied = true;
          this.items = response ? response.items : [];
          this.updateStorage();
          return this.items;
        }));
    }));
  }

  quantifyItems() {
    return this.items.length;
  }

  addToCart(id: number) {
    const item = this.supplyService.getOffer(id);
    this.items.push(item);
    this.itemsQuantityChanged.next(this.items.length);
    this.itemsChange.next(this.items);
    this.updateStorage();
  }

  removeFromCart(id: number) {
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
    this.itemsQuantityChanged.next(this.items.length);
    this.itemsChange.next(this.items);
    this.updateStorage();
  }

  isAdded(id: number) {
    const foundItems = this.items.filter(item => item.id === id);
    return foundItems.length > 0;
  }

  prepare() {
    console.log('prepare');
    this.items = JSON.parse(localStorage.getItem('items')) || [];
    this.itemsQuantityChanged.next(this.items.length);
    this.itemsChange.next(this.items);
  }

  resetSupply() {
    this.supplied = false;
  }

  private updateStorage() {
    const readyItems = JSON.stringify(this.items);
    localStorage.setItem('items', readyItems);
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.put(`https://luxuryvoyage1-9d7d0.firebaseio.com/cart/${user.id}.json?auth=${user.getToken()}`, {
        items: this.items
      });
    }))
      .subscribe(result => {
        //console.log(result);
      });
  }
}
