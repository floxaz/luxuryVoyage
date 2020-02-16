import { NgModule } from '@angular/core';
import { PurchaseComponent } from './purchase.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule} from '@ngx-translate/core';
import { AuthGuardService } from '../auth/auth-guard.service';

@NgModule({
  declarations: [
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: PurchaseComponent, canActivate: [AuthGuardService]},
      {path: '**', redirectTo: '/not-found'}
    ]),
    TranslateModule.forChild()
  ]
})
export class PurchaseModule { }
