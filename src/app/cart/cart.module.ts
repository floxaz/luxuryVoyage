import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {path: '', component: CartComponent, canActivate: [AuthGuardService]}
    ]),
    TranslateModule.forChild()
  ]
})
export class CartModule { }
