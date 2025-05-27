import { Component, OnInit } from '@angular/core';
import { FAQS } from '../../../_system/_constants';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsResponse } from '../../../_system/_interfaces/subscriptions';
import { SubscriptionsService } from '../../../_system/_services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false,
})

export class HomeComponent implements OnInit {
  public subscriptionList?: SubscriptionsResponse[];
  public faqsList: {question: string, answer: string}[] = FAQS;

  constructor(
    private activatedRoute: ActivatedRoute,
    private subscriptionsService: SubscriptionsService,
  ) {}

  ngOnInit() {
    const url = this.activatedRoute.snapshot.params['home'] ?? 'home';

    this.loadFakeSubscriptions();
  }

  loadLatestSubscriptions() {
    this.subscriptionsService.getLatestSubscriptionsByCategories().subscribe((data) => {
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
      }
    ];
  }
}
