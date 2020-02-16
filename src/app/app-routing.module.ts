import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'not-found', component: PageNotFoundComponent},
  {path: 'offers', loadChildren: () => import('./offers/offers.module').then(m => m.OffersModule)},
  {path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'signup', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'purchase', loadChildren: () => import('./purchase/purchase.module').then(m => m.PurchaseModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
