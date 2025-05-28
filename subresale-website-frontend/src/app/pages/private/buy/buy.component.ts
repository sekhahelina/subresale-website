import { Component, OnInit } from '@angular/core';
import { SubscriptionsResponse } from '../../../_system/_interfaces/subscriptions';
import { SubscriptionDataService } from '../../../_system/_services/subscriptionData/subscription-data.service';
import { UserStateService } from '../../../_system/_services/user-state/user-state.service';
import { UserResponse } from '../../../_system/_interfaces/user';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {TokenService} from '../../../_system/_services/token/token.service';

@Component({
  selector: 'app-buy',
  imports: [
    FormsModule
  ],
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss',
  standalone: true
})
export class BuyComponent implements OnInit {
  public user?: UserResponse;
  public subscription?: SubscriptionsResponse;

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private userStateService: UserStateService,
    private subscriptionDataService: SubscriptionDataService
  ) {}

  ngOnInit() {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.userStateService.loadUserById(userId).subscribe({
        next: (user) => {
          this.user = user;
        },
        error: (error) => {
          console.error('Помилка отримання користувача по токену:', error);
        }
      });
    } else {
      console.warn('Токен відсутній або протухлий');
    }

    this.subscription = this.subscriptionDataService.getSubscription();
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

  onPurchaseSubmit() {
    if (!this.user || !this.subscription) {
      return;
    }

    this.userStateService.buySubscription(this.user.id, this.subscription.id).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.router.navigate(['/account/bought-subscription']);
      },
      error: (error) => {
        console.error('Помилка покупки:', error);
      }
    });
  }
}
