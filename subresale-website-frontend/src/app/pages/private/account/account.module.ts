import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@NgModule({
  declarations: [
    AccountComponent,
    AccountInfoComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
})
export class AccountModule { }
