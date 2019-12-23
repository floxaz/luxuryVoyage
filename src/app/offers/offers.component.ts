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

  constructor(private supplyService: SupplyOfferService) { }

  ngOnInit() {
    if (!this.offers) {
      this.supplyService.getOffers().pipe(take(1))
        .subscribe(offers => {
          this.offers = offers;
        });
    }
  }
}
