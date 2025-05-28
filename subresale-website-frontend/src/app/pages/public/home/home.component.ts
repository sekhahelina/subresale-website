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

    this.loadLatestSubscriptions();
  }

  loadLatestSubscriptions() {
    this.subscriptionsService.getLatestSubscriptionsByCategories().subscribe((data) => {
      this.subscriptionList = data;
    })
  }
}
