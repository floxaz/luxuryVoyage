import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { TranslateModule} from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';

import { OffersComponent } from './offers.component';
import { OfferComponent } from './offer/offer.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    OffersComponent,
    OfferComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    LazyLoadImageModule,
    RouterModule.forChild([
      {path: '', component: OffersComponent, canActivate: [AuthGuardService]},
    ]),
    TranslateModule.forChild()
  ]
})
export class OffersModule { }
