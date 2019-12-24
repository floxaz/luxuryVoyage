import { Component, OnInit } from '@angular/core';
import { SupplyOfferService } from './offer/supply-offer.service';
import { Offer } from './offer/offer.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  offers: Offer[];
  isLoading = false;

  constructor(private supplyService: SupplyOfferService) { }

  ngOnInit() {
    const offersData = JSON.parse(localStorage.getItem('offers'));
    if (offersData) {
      this.offers = offersData;
    } else {
      this.isLoading = true;
      this.supplyService.getOffers().pipe(take(1))
        .subscribe(offers => {
          this.offers = offers;
          this.isLoading = false;
        });
    }
  }
}
