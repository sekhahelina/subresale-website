import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { Subscription } from 'rxjs';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { SubscriptionsResponse } from '../../../../_system/_interfaces/subscriptions';
import { UserSubscriptionsService } from '../../../../_system/_services/userSubscriptions/user-subscriptions.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-account-bought-sub',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './account-bought-sub.component.html',
  styleUrl: './account-bought-sub.component.scss',
  standalone: true
})
export class AccountBoughtSubComponent implements OnInit, OnDestroy {
  public userId: string = '';
  public userData!: UserResponse;
  public currentUserSubscription!: Subscription;
  public boughtSubscriptionsData!: SubscriptionsResponse[];

  constructor(
    private userStateService: UserStateService,
    private userSubscriptionsService: UserSubscriptionsService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userId = this.userData.id;

        this.loadBoughtSubscriptions(this.userData);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  loadBoughtSubscriptions(user: UserResponse) {
    if (!user.boughtSubscriptions || user.boughtSubscriptions.length === 0) {
      this.boughtSubscriptionsData = [];
      return;
    }

    this.userSubscriptionsService.getBoughtSubscriptions(user.boughtSubscriptions).subscribe(data => {
      this.boughtSubscriptionsData = data;
    });
  }
}
