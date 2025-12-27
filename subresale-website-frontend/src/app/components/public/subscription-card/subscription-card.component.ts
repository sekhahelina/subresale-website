import { Component, Input, OnInit } from '@angular/core';
import { SubscriptionsResponse } from '../../../_system/_interfaces/subscriptions';
import { Router } from '@angular/router';
import { SubscriptionDataService } from '../../../_system/_services/subscriptionData/subscription-data.service';
import { TokenService } from '../../../_system/_services/token/token.service';
import { SessionService } from '../../../_system/_services/session/session.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service'; // Додано
import { UserResponse } from '../../../_system/_interfaces/user'; // Додано

@Component({
  selector: 'app-subscription-card',
  imports: [],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.scss',
  standalone: true
})
export class SubscriptionCardComponent implements OnInit {
  @Input() subscription!: SubscriptionsResponse;
  public user?: UserResponse; // Змінна для зберігання даних користувача

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private sessionService: SessionService,
    private subscriptionDataService: SubscriptionDataService,
    private userStateService: UserStateService // Додано
  ) {}

  ngOnInit() {
    // Завантажуємо дані користувача, щоб знати, які підписки він продає
    const userId = this.tokenService.getUserIdFromToken();
    if (userId) {
      this.userStateService.loadUserById(userId).subscribe({
        next: (user) => (this.user = user),
        error: (err) => console.error('Error loading user in card:', err)
      });
    }
  }

  getCurrencyWord(value: number | null | undefined): string {
    const num = Math.floor(value ?? 0) % 100;
    const lastDigit = num % 10;
    if (num > 10 && num < 20) return 'доларів';
    if (lastDigit === 1) return 'долар';
    if (lastDigit >= 2 && lastDigit <= 4) return 'долари';
    return 'доларів';
  }

  getFormattedDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const months = ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'];
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${day} ${months[monthIndex]} ${year}`;
  }

  goToBuy(subscription: SubscriptionsResponse) {
    const token = this.tokenService.token;
    const isValid = token && !this.tokenService.isTokenExpired(token);
  }
}