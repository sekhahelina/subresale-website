import { Injectable } from '@angular/core';
import { SubscriptionsResponse } from '../../_interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionDataService {
  private subscription: SubscriptionsResponse | undefined = undefined;

  setSubscription(subscription: SubscriptionsResponse) {
    this.subscription = subscription;
  }

  getSubscription(): SubscriptionsResponse | undefined {
    return this.subscription;
  }
}
