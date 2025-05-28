import { Component, OnInit } from '@angular/core';
import { SubscriptionsResponse } from '../../../_system/_interfaces/subscriptions';
import { SubscriptionDataService } from '../../../_system/_services/subscriptionData/subscription-data.service';

@Component({
  selector: 'app-buy',
  imports: [],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
  standalone: true
})
export class BuyComponent implements OnInit {
  public subscription?: SubscriptionsResponse;

  constructor(
    private subscriptionDataService: SubscriptionDataService
  ) {}

  ngOnInit() {
    this.subscription = this.subscriptionDataService.getSubscription();
    console.log(this.subscription);
  }

  getCurrencyWord(value: number | null | undefined): string {
    const num = Math.floor(value ?? 0) % 100;
    const lastDigit = num % 10;

    if (num > 10 && num < 20) {
      return 'доларів';
    }

    if (lastDigit === 1) {
      return 'долар';
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'долари';
    }

    return 'доларів';
  }

  getFormattedDate(dateString: string | undefined): string {
    if (!dateString) {
      return '';
    }

    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];

    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;

    return `${day} ${months[monthIndex]} ${year}`;
  }
}
