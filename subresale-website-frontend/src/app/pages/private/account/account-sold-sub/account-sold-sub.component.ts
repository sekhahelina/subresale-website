import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserResponse} from '../../../../_system/_interfaces/user';
import {Subscription} from 'rxjs';
import {SubscriptionsResponse} from '../../../../_system/_interfaces/subscriptions';
import {UserStateService} from '../../../../_system/_services/user-state/user-state.service';
import {UserSubscriptionsService} from '../../../../_system/_services/userSubscriptions/user-subscriptions.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-account-sold-sub',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './account-sold-sub.component.html',
  styleUrl: './account-sold-sub.component.scss',
  standalone: true,
})
export class AccountSoldSubComponent implements OnInit, OnDestroy {
  public userId: string = '';
  public userData!: UserResponse;
  public currentUserSubscription!: Subscription;
  public soldSubscriptionsData!: SubscriptionsResponse[];

  constructor(
    private userStateService: UserStateService,
    private userSubscriptionsService: UserSubscriptionsService,
  ) {}

  ngOnInit() {
    this.currentUserSubscription = this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = user;
        this.userId = this.userData.id;

        this.loadSoldSubscriptions(this.userData);
      }
    });
  }

  ngOnDestroy() {
    if (this.currentUserSubscription) {
      this.currentUserSubscription.unsubscribe();
    }
  }

  loadSoldSubscriptions(user: UserResponse) {
    if (!user.soldSubscriptions || user.soldSubscriptions.length === 0) {
      this.soldSubscriptionsData = [];
      return;
    }

    this.userSubscriptionsService.getSoldSubscriptions(user.soldSubscriptions).subscribe(data => {
      this.soldSubscriptionsData = data;
    });
  }
}
