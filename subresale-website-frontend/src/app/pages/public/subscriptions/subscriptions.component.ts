import { Component } from '@angular/core';
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
export class SubscriptionsComponent {
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
      // this.loadSubscriptionsByCategory(url);

      this.loadFakeSubscriptions();
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

  loadFakeSubscriptions() {
    this.subscriptionList = [
      {
        id: '1',
        title: 'Frontend Mastery',
        category: 'Development',
        pricePerMonth: 29.99,
        expiresAt: '2025-12-31',
        image: 'assets/icons/cinema-disney-icon.png',
        description: 'Learn modern frontend frameworks like Angular, React, and Vue.'
      },
      {
        id: '2',
        title: 'Data Science Pro',
        category: 'Analytics',
        pricePerMonth: 39.99,
        expiresAt: '2025-10-15',
        image: 'assets/icons/music-amazon-icon.png',
        description: 'Deep dive into data analysis, machine learning and Python.'
      },
      {
        id: '3',
        title: 'UI/UX Design',
        category: 'Design',
        pricePerMonth: 19.99,
        expiresAt: '2025-08-01',
        image: 'assets/icons/design-adobe-icon.png',
        description: 'Master user interface and user experience design principles.'
      },{
        id: '1',
        title: 'Frontend Mastery',
        category: 'Development',
        pricePerMonth: 29.99,
        expiresAt: '2025-12-31',
        image: 'assets/icons/cinema-disney-icon.png',
        description: 'Learn modern frontend frameworks like Angular, React, and Vue.'
      },
      {
        id: '2',
        title: 'Data Science Pro',
        category: 'Analytics',
        pricePerMonth: 39.99,
        expiresAt: '2025-10-15',
        image: 'assets/icons/music-amazon-icon.png',
        description: 'Deep dive into data analysis, machine learning and Python.'
      },
      {
        id: '3',
        title: 'UI/UX Design',
        category: 'Design',
        pricePerMonth: 19.99,
        expiresAt: '2025-08-01',
        image: 'assets/icons/design-adobe-icon.png',
        description: 'Master user interface and user experience design principles.'
      },{
        id: '1',
        title: 'Frontend Mastery',
        category: 'Development',
        pricePerMonth: 29.99,
        expiresAt: '2025-12-31',
        image: 'assets/icons/cinema-disney-icon.png',
        description: 'Learn modern frontend frameworks like Angular, React, and Vue.'
      },
      {
        id: '2',
        title: 'Data Science Pro',
        category: 'Analytics',
        pricePerMonth: 39.99,
        expiresAt: '2025-10-15',
        image: 'assets/icons/music-amazon-icon.png',
        description: 'Deep dive into data analysis, machine learning and Python.'
      },
      {
        id: '3',
        title: 'UI/UX Design',
        category: 'Design',
        pricePerMonth: 19.99,
        expiresAt: '2025-08-01',
        image: 'assets/icons/design-adobe-icon.png',
        description: 'Master user interface and user experience design principles.'
      },{
        id: '1',
        title: 'Frontend Mastery',
        category: 'Development',
        pricePerMonth: 29.99,
        expiresAt: '2025-12-31',
        image: 'assets/icons/cinema-disney-icon.png',
        description: 'Learn modern frontend frameworks like Angular, React, and Vue.'
      },
      {
        id: '2',
        title: 'Data Science Pro',
        category: 'Analytics',
        pricePerMonth: 39.99,
        expiresAt: '2025-10-15',
        image: 'assets/icons/music-amazon-icon.png',
        description: 'Deep dive into data analysis, machine learning and Python.'
      },
      {
        id: '3',
        title: 'UI/UX Design',
        category: 'Design',
        pricePerMonth: 19.99,
        expiresAt: '2025-08-01',
        image: 'assets/icons/design-adobe-icon.png',
        description: 'Master user interface and user experience design principles.'
      },{
        id: '1',
        title: 'Frontend Mastery',
        category: 'Development',
        pricePerMonth: 29.99,
        expiresAt: '2025-12-31',
        image: 'assets/icons/cinema-disney-icon.png',
        description: 'Learn modern frontend frameworks like Angular, React, and Vue.'
      },
      {
        id: '2',
        title: 'Data Science Pro',
        category: 'Analytics',
        pricePerMonth: 39.99,
        expiresAt: '2025-10-15',
        image: 'assets/icons/music-amazon-icon.png',
        description: 'Deep dive into data analysis, machine learning and Python.'
      },
      {
        id: '3',
        title: 'UI/UX Design',
        category: 'Design',
        pricePerMonth: 19.99,
        expiresAt: '2025-08-01',
        image: 'assets/icons/design-adobe-icon.png',
        description: 'Master user interface and user experience design principles.'
      }
    ];
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
