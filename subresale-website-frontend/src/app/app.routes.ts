import { Routes } from '@angular/router';
import { authGuard } from './_system/_guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/public/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./pages/public/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/public/about-us/about-us.module').then(m => m.AboutUsModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/public/sign-in/sign-in.module').then(m => m.SignInModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'buy',
    loadChildren: () => import('./pages/private/buy/buy.module').then(m => m.BuyModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/private/account/account.module').then(m => m.AccountModule),
    canActivate: [authGuard]
  }
];
