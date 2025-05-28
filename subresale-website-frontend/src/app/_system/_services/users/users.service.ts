import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private resourceUrl = environment.BACKEND_PRIVATE_URL;

  private api = {
    users: `${this.resourceUrl}users`
  }

  constructor(
    private http: HttpClient,
  ) { }

  getUserById(id: string): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.api.users}/${id}`);
  }

  updateUserData(id: string, updatedData: Partial<UserResponse>): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${this.api.users}/${id}`, updatedData);
  }

  buySubscription(userId: string, subscriptionId: string): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.api.users}/${userId}/buy-subscription`, { subscriptionId });
  }

  addSoldSubscription(userId: string, subscriptionData: any): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.api.users}/${userId}/add-sold-subscription`, subscriptionData);
  }
}
