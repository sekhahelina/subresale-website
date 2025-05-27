import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionCardComponent } from '../../../components/public/subscription-card/subscription-card.component';


@NgModule({
  declarations: [
    SubscriptionsComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    SubscriptionCardComponent
  ]
})
export class SubscriptionsModule { }
