import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { PATHS } from './constants/paths';
import { AddEditPageComponent } from './pages/add-edit-page/add-edit-page.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { BuyTicketPageComponent } from './pages/buy-ticket-page/buy-ticket-page.component';
import { EditProfilPageComponent } from './pages/edit-profile-page/edit-profil-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfilPageComponent } from './pages/profile-page/profil-page.component';
import { PromoCodePageComponent } from './pages/promo-code-page/promo-code-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ScanTicketPageComponent } from './pages/scan-ticket-page/scan-ticket-page.component';
import { PromoCodeDetailsComponent } from './pages/promo-code-details/promo-code-details.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { adminGuard } from './guards/admin.guard';
import { logoutGuard } from './guards/logout.guard';
import { scannerGuard } from './guards/scanner.guard';
import { userGuard } from './guards/user.guard';
import { EnterEmailPageComponent } from './pages/enter-email-page/enter-email-page.component';
import { VerifyAccountPageComponent } from './pages/verify-account-page/verify-account-page.component';
import { EventsListPageComponent } from './pages/events-list-page/events-list-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentCancelPageComponent } from './pages/payment-cancel-page/payment-cancel-page.component';
import { PaymentDonePageComponent } from './pages/payment-done-page/payment-done-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AdminEventDetailsPageComponent } from './pages/admin-event-details-page/admin-event-details-page.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { TermsAndConditionsPageComponent } from './pages/terms-and-conditions-page/terms-and-conditions-page.component';
import { PrivacyPolicyPageComponent } from './pages/privacy-policy-page/privacy-policy-page.component';

const routes: Routes = [
  { path: '', redirectTo: PATHS.EVENTS, pathMatch: 'full' },
  { component: EventsPageComponent, path: PATHS.EVENTS },
  {
    component: AddEditPageComponent,
    path: PATHS.ADDEVENT,
    canActivate: [adminGuard],
  },
  {
    component: AddEditPageComponent,
    path: PATHS.EDITEVENT + '/:id',
    canActivate: [adminGuard],
  },
  {
    component: AdminPageComponent,
    path: PATHS.ADMIN,
    canActivate: [adminGuard],
  },
  { component: BuyTicketPageComponent, path: PATHS.BUYTICKET },
  {
    component: EditProfilPageComponent,
    path: PATHS.EDITPROFILE,
    canActivate: [userGuard],
  },
  {
    component: EventPageComponent,
    path: PATHS.EVENT + '/:id',
  },
  {
    component: LoginPageComponent,
    path: PATHS.LOGIN,
    canActivate: [logoutGuard],
  },
  {
    component: ProfilPageComponent,
    path: PATHS.PROFILE,
    canActivate: [userGuard],
  },
  {
    component: TicketsPageComponent,
    path: PATHS.TICKETSPAGE,
    canActivate: [userGuard],
  },
  {
    component: PromoCodePageComponent,
    path: PATHS.PROMOCODE,
    canActivate: [userGuard],
  },
  {
    component: RegisterPageComponent,
    path: PATHS.REGISTER,
    canActivate: [logoutGuard],
  },
  {
    component: VerifyAccountPageComponent,
    path: PATHS.VERIFYACCOUNT + '/:token',
    canActivate: [logoutGuard],
  },
  {
    component: ScanTicketPageComponent,
    path: PATHS.SCAN,
  },
  {
    component: PromoCodeDetailsComponent,
    path: PATHS.PROMOCODEDETAILS,
  },
  {
    component: CheckoutPageComponent,
    path: PATHS.CHECKOUT + '/:id',
  },
  {
    component: PaymentPageComponent,
    path: PATHS.PAYMENT,
  },
  {
    component: PaymentCancelPageComponent,
    path: PATHS.PAYMENTCANCEL,
  },
  {
    component: PaymentDonePageComponent,
    path: PATHS.PAYMENTSUCCESS,
  },
  {
    component: ForgotPasswordPageComponent,
    path: PATHS.RESETPASSWORD + '/:token',
    canActivate: [logoutGuard],
  },
  {
    component: EnterEmailPageComponent,
    path: PATHS.EMAILFORRESET,
    canActivate: [logoutGuard],
  },
  {
    component: EventsListPageComponent,
    path: PATHS.EVENTLIST,
    canActivate: [adminGuard],
  },
  {
    component: AdminEventDetailsPageComponent,
    path: PATHS.EVENTDETAILSADMIN + '/:id',
    canActivate: [adminGuard],
  },
  {
    component: TermsAndConditionsPageComponent,
    path: PATHS.TERMS,
  },
  {
    component: PrivacyPolicyPageComponent,
    path: PATHS.POLICY,
  },
  {
    component: NotFoundPageComponent,
    path: '**',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
