import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { BuyTicketPageComponent } from './pages/buy-ticket-page/buy-ticket-page.component';
import { ProfilPageComponent } from './pages/profile-page/profil-page.component';
import { EditProfilPageComponent } from './pages/edit-profile-page/edit-profil-page.component';
import { PromoCodePageComponent } from './pages/promo-code-page/promo-code-page.component';
import { ScanTicketsPageComponent } from './pages/scan-tickets-page/scan-tickets-page.component';
import { AddEditPageComponent } from './pages/add-edit-page/add-edit-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PromoCodeDetailsComponent } from './pages/promo-code-details/promo-code-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { EnterEmailPageComponent } from './pages/enter-email-page/enter-email-page.component';
import { CommonModule } from '@angular/common';
import { DiscountBarComponent } from './components/discount-bar/discount-bar.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { VerifyAccountPageComponent } from './pages/verify-account-page/verify-account-page.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { EventItemComponent } from './components/event-item/event-item.component';
import { EventsListPageComponent } from './pages/events-list-page/events-list-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { PaymentDonePageComponent } from './pages/payment-done-page/payment-done-page.component';
import { PaymentCancelPageComponent } from './pages/payment-cancel-page/payment-cancel-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AdminEventDetailsPageComponent } from './pages/admin-event-details-page/admin-event-details-page.component';
import { TicketComponent } from './components/ticket/ticket.component';
import { TicketsPageComponent } from './pages/tickets-page/tickets-page.component';
import { QRCodeComponent, QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [
    AppComponent,
    EventsPageComponent,
    EventPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    BuyTicketPageComponent,
    ProfilPageComponent,
    EditProfilPageComponent,
    PromoCodePageComponent,
    ScanTicketsPageComponent,
    ForgotPasswordPageComponent,
    AddEditPageComponent,
    AdminPageComponent,
    NavbarComponent,
    FooterComponent,
    PromoCodeDetailsComponent,
    EnterEmailPageComponent,
    DiscountBarComponent,
    VerifyAccountPageComponent,
    EventItemComponent,
    EventsListPageComponent,
    PaymentPageComponent,
    PaymentDonePageComponent,
    PaymentCancelPageComponent,
    CheckoutPageComponent,
    AdminEventDetailsPageComponent,
    TicketComponent,
    TicketsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    GoogleMapsModule,
    FormsModule,
    QRCodeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
