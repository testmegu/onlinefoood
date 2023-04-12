import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AddMoneyComponent } from './customer-portal/add-money/add-money.component';
import { CustomerDetailsComponent } from './customer-portal/customer-details/customer-details.component';
import { UpdateCustomerComponent } from './customer-portal/customer-details/update-customer/update-customer.component';
import { CustomerPortalComponent } from './customer-portal/customer-portal.component';
import { PlaceOrderComponent } from './customer-portal/place-order/place-order.component';
import { ViewTransactionComponent } from './customer-portal/view-transaction/view-transaction.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RegisterComponent } from './register/register.component';
import { CustomerListComponent } from './restaurant-portal/customer-list/customer-list.component';
import { AddItemComponent } from './restaurant-portal/update-menu/add-item/add-item.component';
import { UpdateMenuComponent } from './restaurant-portal/update-menu/update-menu.component';
import { UpdateTransactionComponent } from './restaurant-portal/update-transaction/update-transaction.component';
import { UpdateRestaurantComponent } from './restaurant-portal/restaurant-details/update-restaurant/update-restaurant.component';
import { RestaurantDetailsComponent } from './restaurant-portal/restaurant-details/restaurant-details.component';
import { RestaurantPortalComponent } from './restaurant-portal/restaurant-portal.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'restaurant/:id', component: RestaurantPortalComponent},
  {path: 'restaurant/:id/customer-list', component:CustomerListComponent},
  {path: 'customer/:id', component: CustomerPortalComponent},
  {path: '', component: LoginComponent},
  {path: 'customer/:id/details', component: CustomerDetailsComponent},
  {path: 'customer/:id/addmoney', component: AddMoneyComponent},
  {path: 'customer/:id/placeorder', component:PlaceOrderComponent},
  {path: 'customer/:id/transaction', component: ViewTransactionComponent},
  {path: 'customer/:id/details/update', component: UpdateCustomerComponent},
  {path: 'restaurant/:id/details', component: RestaurantDetailsComponent},
  {path: 'restaurant/:id/transaction', component: UpdateTransactionComponent},
  {path: 'restaurant/:id/updatemenu', component: UpdateMenuComponent},
  {path: 'restaurant/:id/updatemenu/add', component: AddItemComponent},
  {path: 'forget-password', component: ForgetPasswordComponent},
  {path: 'restaurant/:id/details/update', component: UpdateRestaurantComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
