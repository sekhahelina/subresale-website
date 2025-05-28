import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../../../_system/_interfaces/user';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserStateService } from '../../../../_system/_services/user-state/user-state.service';
import { SUBSCRIPTION_CATEGORIES } from '../../../../_system/_constants';
import { NgForOf, NgIf } from '@angular/common';
import { SubscriptionsService } from '../../../../_system/_services/subscriptions/subscriptions.service';
import { SubscriptionsRequest } from '../../../../_system/_interfaces/subscriptions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-selling-sub',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './account-selling-sub.component.html',
  styleUrl: './account-selling-sub.component.scss',
  standalone: true,
})
export class AccountSellingSubComponent implements OnInit {
  public form!: FormGroup;
  public categories = SUBSCRIPTION_CATEGORIES;
  public filteredIcons: { name: string, url: string }[] = [];

  public userData!: UserResponse;
  public selectedCategory: string | null = null;
  public selectedIconName: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userStateService: UserStateService,
    private subscriptionsService: SubscriptionsService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      pricePerMonth: ['', Validators.required],
      expiresAt: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
    });

    this.userStateService.currentUser$.subscribe(user => {
      if (user) {
        this.userData = user;
      }
    });
  }

  onCategorySelected(categoryName: string) {
    const foundCategory = this.categories.find(cat => cat.name === categoryName);

    this.form.patchValue({
      category: foundCategory?.url || '',
      title: '',
      image: ''
    });

    this.filteredIcons = foundCategory ? foundCategory.icons : [];
  }

  onIconSelected(iconName: string) {
    const selectedIcon = this.filteredIcons.find(icon => icon.name === iconName);
    if (selectedIcon) {
      this.form.patchValue({
        title: selectedIcon.name,
        image: selectedIcon.url
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const subscriptionData: SubscriptionsRequest = {
      ...this.form.value,
      pricePerMonth: parseFloat(this.form.value.pricePerMonth)
    };

    this.userStateService.addSoldSubscription(this.userData.id, subscriptionData).subscribe({
      next: (res) => {

        this.form.reset();

        this.selectedCategory = null;
        this.selectedIconName = null;
        this.filteredIcons = [];

        this.router.navigate(['/account/sold-subscription']);
      },
      error: (err) => {
        console.error('Помилка при створенні підписки:', err);
      }
    });
  }
}
