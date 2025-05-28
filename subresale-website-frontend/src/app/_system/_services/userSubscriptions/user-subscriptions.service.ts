import { Injectable } from '@angular/core';
import { environment} from '../../../../environments/environment';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubscriptionsResponse } from '../../_interfaces/subscriptions';

@Injectable({
  providedIn: 'root'
})
export class UserSubscriptionsService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    userSubscriptions: `${this.resourceUrl}userSubscriptions`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getSoldSubscriptions(ids: string[]): Observable<SubscriptionsResponse[]> {
    const params = { ids: ids.join(',') };
    return this.http.get<SubscriptionsResponse[]>(`${this.api.userSubscriptions}/sold`, { params });
  }

  getBoughtSubscriptions(ids: string[]): Observable<SubscriptionsResponse[]> {
    const params = { ids: ids.join(',') };
    return this.http.get<SubscriptionsResponse[]>(`${this.api.userSubscriptions}/bought`, { params });
  }
}
