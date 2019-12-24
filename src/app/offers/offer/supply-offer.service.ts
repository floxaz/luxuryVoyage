import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyOfferService {
  private offers: Offer[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOffers() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<{[key: string]: Offer[]}>(`https://luxuryvoyage1-9d7d0.firebaseio.com/offers.json?auth=${user.getToken()}`);
    }), map(response => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.offers = response[key];
          return this.offers;
        }
      }
    }));
  }

  getOffer(id: number) {
    const foundOffers = this.offers.filter(offer => offer.id === id);
    return foundOffers[0];
  }
}
