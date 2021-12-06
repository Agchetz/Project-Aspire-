import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/auth-guard.guard';
import { DashboardComponent } from './component/dashboard/dashboard/dashboard.component';
import { LoginComponent } from './component/userComponent/login/login.component';
import { OrderCreateComponent } from './component/orderComponent/order-create/order-create.component';
import { OrderListComponent } from './component/orderComponent/order-list/order-list.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { RegistrationComponent } from './component/userComponent/registration/registration.component';
import { DynamicGridComponent } from './Shared/dynamic-grid/dynamic-grid.component';
import { ForgotPasswordComponent } from './component/userComponent/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/userComponent/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'order/create',
    component: OrderCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/update/:id',
    component: OrderCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'order/list',
    component: DynamicGridComponent,
    canActivate: [AuthGuard],
  },
  { path: 'home', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'resetPassword/:token', component: ResetPasswordComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  RegistrationComponent,
  OrderListComponent,
  DashboardComponent,
  ForgotPasswordComponent,
  PageNotFoundComponent,
  OrderCreateComponent,
  DynamicGridComponent,
  LoginComponent,
  ResetPasswordComponent
];
