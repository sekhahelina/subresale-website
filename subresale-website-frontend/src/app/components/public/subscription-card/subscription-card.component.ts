import {Component, Input} from '@angular/core';
import {SubscriptionsResponse} from '../../../_system/_interfaces/subscriptions';

@Component({
  selector: 'app-subscription-card',
  imports: [],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
  standalone: true
})
export class SubscriptionCardComponent {
  @Input() subscription?: SubscriptionsResponse;

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
