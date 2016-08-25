import { provideRouter, RouterConfig } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';

// import the components we need for each route
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { LoginComponent } from '../login/login.component';
import { BillingComponent } from '../billing/billing.component';
import { PoliciesComponent } from '../policies/policies.component';
import { ClaimsComponent } from '../claims/claims.component';
import { ContactComponent } from '../contact/contact.component';
import { SettingsComponent } from '../settings/settings.component';

export const APP_ROUTES: RouterConfig = [
  { path: '', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'billing', component: BillingComponent },
  { path: 'policies', component: PoliciesComponent },
  { path: 'claims', component: ClaimsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', component: NotFoundComponent }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(APP_ROUTES),
  HTTP_PROVIDERS
];
