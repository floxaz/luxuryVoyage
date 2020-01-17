import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SupplyOfferService } from '../offers/offer/supply-offer.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { take, exhaustMap, map, tap } from 'rxjs/operators';
import { Offer } from '../offers/offer/offer.model';
import { User } from '../shared/user.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = [];
  private url = 'https://luxuryvoyage1-9d7d0.firebaseio.com/cart/';
  itemsQuantityChanged = new Subject<number>();
  itemsChange = new Subject<any>();
  suppliedFromFirebase = false;

  constructor(
    private supplyService: SupplyOfferService,
    private http: HttpClient, private authService: AuthService) { }


  getItems() {
    return this.items.slice();
  }

  quantifyItems() {
    return this.items.length;
  }

  addToCart(id: number) {
    const item = this.supplyService.getOffer(id);
    this.items.push(item);
    this.itemsQuantityChanged.next(this.items.length);
    this.itemsChange.next(this.items);
    this.updateFirebase();
  }

  removeFromCart(id: number) {
    const index = this.items.findIndex(item => item.id === id);
    this.items.splice(index, 1);
    this.itemsQuantityChanged.next(this.items.length);
    this.itemsChange.next(this.items);
    this.updateFirebase();
    this.updateLocalStorage();
  }

  isAdded(id: number) {
    const foundItems = this.items.filter(item => item.id === id);
    return foundItems.length > 0;
  }

  prepare() {
    if (!this.suppliedFromFirebase) {
      this.authService.user.pipe(take(1), exhaustMap(user => {
        return this.http.get<{ [key: string]: Offer[] }>(`${this.url}${user.id}.json?auth=${user.getToken()}`);
      }), map(response => response ? response.items : []))
        .subscribe(items => {
          this.items = items;
          this.suppliedFromFirebase = true;
          this.updateLocalStorage();
          this.itemsQuantityChanged.next(this.items.length);
          this.itemsChange.next(this.items);
        });
    } else {
      this.items = JSON.parse(localStorage.getItem('items')) || [];
      this.itemsQuantityChanged.next(this.items.length);
      this.itemsChange.next(this.items);
    }
  }

  resetSupply() {
    this.suppliedFromFirebase = false;
  }

  private updateLocalStorage() {
    const readyItems = JSON.stringify(this.items);
    localStorage.setItem('items', readyItems);
  }

  private updateFirebase() {
    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.put(`https://luxuryvoyage1-9d7d0.firebaseio.com/cart/${user.id}.json?auth=${user.getToken()}`, {
        items: this.items
      });
    }))
      .subscribe();
  }
}
