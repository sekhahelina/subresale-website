import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionsResponse } from '../../_interfaces/subscriptions';

class CreateSubscriptionRequest {
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  private resourceUrl = environment.BACKEND_PUBLIC_URL;

  private api = {
    subscriptions: `${this.resourceUrl}subscriptions`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getLatestSubscriptionsByCategories(): Observable<SubscriptionsResponse[]> {
    return this.http.get<SubscriptionsResponse[]>(`${this.api.subscriptions}/latest-by-categories`);
  }

  getAllSubscriptionsByCategory(category: string): Observable<SubscriptionsResponse[]> {
    return this.http.get<SubscriptionsResponse[]>(`${this.api.subscriptions}/category/${category}`);
  }
}
