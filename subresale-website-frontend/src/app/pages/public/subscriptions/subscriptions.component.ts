import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsResponse } from '../../../_system/_interfaces/subscriptions';
import {SubscriptionsService} from '../../../_system/_services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.scss',
  standalone: false
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  public currentPage: number = 1;
  public itemsPerPage: number = 12;
  public routeSubscription!: Subscription;
  public subscriptionList?: SubscriptionsResponse[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriptionsService: SubscriptionsService,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      const url = params['subscriptionCategory'];
      this.loadSubscriptionsByCategory(url);
    })
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  loadSubscriptionsByCategory(category: string): void {
    this.subscriptionsService.getAllSubscriptionsByCategory(category).subscribe((data) => {
      this.subscriptionList = data;
    })
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  get totalPages(): number {
    return Math.ceil((this.subscriptionList?.length ?? 0) / this.itemsPerPage);
  }

  get paginatedSubscription(): SubscriptionsResponse[] {
    if (!this.subscriptionList) {
      return [];
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    return this.subscriptionList.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
