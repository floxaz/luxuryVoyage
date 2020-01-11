import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OffersComponent } from './offers/offers.component';
import { AuthComponent } from './auth/auth.component';
import { CartComponent } from './cart/cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'offers', component: OffersComponent, canActivate: [AuthGuardService]},
  {path: 'cart', component: CartComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: AuthComponent},
  {path: 'signup', component: AuthComponent},
  {path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuardService]},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
