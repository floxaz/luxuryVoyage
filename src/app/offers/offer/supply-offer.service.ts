import { Injectable } from '@angular/core';
import { Offer } from './offer.model';
import { HttpClient } from '@angular/common/http';
import { map, exhaustMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SupplyOfferService {
  // private offers: Offer[] = [
  //   new Offer('New York', 1, 'Thomas Habr', 6000, 'The Four Seasons'),
  //   new Offer('Londra', 2, 'Ed Robertson', 10000, 'The Rosewood London'),
  //   new Offer('Parigi', 3, 'Alexander Kagan', 4000, 'Hotel De Crillon'),
  //   new Offer('Barcellona', 4, 'Erwan Hesry', 9000, 'Mandarin Oriental'),
  //   new Offer('Roma', 5, 'Julia Solonina', 4000, 'The St. Regis Rome'),
  //   new Offer('Monaco', 6, 'Anthony Delanoix', 12000, 'Hotel de Paris Monte-Carlo')
  // ];
  private offers: Offer[];

  constructor(private http: HttpClient, private authService: AuthService) { }

  getOffers() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<{[key: string]: Offer[]}>(`https://luxuryvoyage1-9d7d0.firebaseio.com/offers.json?auth=${user.getToken()}`);
    }), map(response => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.offers = response[key];
          return response[key];
        }
      }
    }));
  }

  getOffer(id: number) {
    const foundOffers = this.offers.filter(offer => offer.id === id);
    return foundOffers[0];
  }
}
