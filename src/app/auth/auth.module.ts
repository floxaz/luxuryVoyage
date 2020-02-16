import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([
      { path: '', component: AuthComponent },
      { path: '', component: AuthComponent }
    ]),
    TranslateModule.forChild()
  ]
})
export class AuthModule { }
