import { NgModule } from '@angular/core';
import { authGuard } from '../../../_system/_guards/auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountInfoComponent } from './account-info/account-info.component';

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
