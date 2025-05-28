import { Injectable } from '@angular/core';
import { SubscriptionsResponse } from '../../_interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionDataService {
  private subscription: SubscriptionsResponse | undefined = undefined;

  setSubscription(sub: SubscriptionsResponse) {
    this.subscription = sub;
  }

  getSubscription(): SubscriptionsResponse | undefined {
    return this.subscription;
  }
}
