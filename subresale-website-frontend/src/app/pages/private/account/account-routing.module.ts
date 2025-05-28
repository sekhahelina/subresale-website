import { NgModule } from '@angular/core';
import { authGuard } from '../../../_system/_guards/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountBoughtSubComponent } from './account-bought-sub/account-bought-sub.component';
import { AccountSoldSubComponent } from './account-sold-sub/account-sold-sub.component';
import { AccountSellingSubComponent } from './account-selling-sub/account-selling-sub.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: 'info',
        canActivate: [authGuard],
        component: AccountInfoComponent
      },
      {
        path: 'bought-subscription',
        canActivate: [authGuard],
        component: AccountBoughtSubComponent
      },
      {
        path: 'sold-subscription',
        canActivate: [authGuard],
        component: AccountSoldSubComponent
      },
      {
        path: 'selling-subscription',
        canActivate: [authGuard],
        component: AccountSellingSubComponent
      },
      {
        path: '',
        pathMatch: "full",
        redirectTo: 'info'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
