import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UsersService } from '../users/users.service';
import { UserResponse } from '../../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  public currentUser$: BehaviorSubject<UserResponse | undefined> = new BehaviorSubject<UserResponse | undefined>(undefined);

  constructor(
    private usersService: UsersService,
  ) { }

  loadUserById(id: string): Observable<UserResponse> {
    return this.usersService.getUserById(id).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  updateUserData(id: string, updatedData: Partial<UserResponse>): Observable<UserResponse> {
    return this.usersService.updateUserData(id, updatedData).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  buySubscription(userId: string, subscriptionId: string): Observable<UserResponse> {
    return this.usersService.buySubscription(userId, subscriptionId).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  addSoldSubscription(userId: string, subscriptionData: any): Observable<UserResponse> {
    return this.usersService.addSoldSubscription(userId, subscriptionData).pipe(
      tap(user => this.currentUser$.next(user))
    );
  }

  clearUser(): void {
    this.currentUser$.next(undefined);
  }
}
