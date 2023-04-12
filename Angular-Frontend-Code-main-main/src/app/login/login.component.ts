import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../model/customer';
import { Restaurant } from '../model/restaurant';
import { CustomerService } from '../service/customer.service';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  roles = ['customer', 'restaurant'];
  customers:Customer[] = [];
  restaurants: Restaurant[] = [];
  currentCustomer: Customer = null;
  currentRestaurant: Restaurant = null;
  loginForm: FormGroup;

  username: FormControl;
  password: FormControl;
  role: FormControl;

  showErrorMessage = false;

  constructor(private customerService: CustomerService, private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.role = new FormControl('customer');
    this.loginForm = new FormGroup(
      {
        'username': this.username,
        'password': this.password,
        'role': this.role,
      }
    );

  }

  onSubmit()
  {
    if (this.role.value == "customer")
      this.customerLogin();
    else
      this.restaurantLogin();
  } 
  
  customerLogin()
  {
    this.customerService.getCustomerList().subscribe(data => 
      {
        this.customers = data;

        this.customers.forEach(customer => 
          {
            if (customer.username == this.loginForm.get('username').value)
            {
              if (customer.password == this.loginForm.get('password').value)
                this.currentCustomer = customer;
            }
          });

        if (this.currentCustomer == null)
          this.showErrorMessage = true;
        else
          this.router.navigate(['customer',this.currentCustomer.customerId]);
        
      });

    this.showErrorMessage = false;
  }

  restaurantLogin()
  {
    this.restaurantService.getAllRestaurants().subscribe(data => 
      {
        this.restaurants = data;

        this.restaurants.forEach(restaurant => 
          {
            if (restaurant.username == this.loginForm.get('username').value)
            {
              if (restaurant.password == this.loginForm.get('password').value)
                this.currentRestaurant = restaurant;
            }
          });

        if (this.currentRestaurant == null)
          this.showErrorMessage = true;
        else
          this.router.navigate(['restaurant',this.currentRestaurant.restaurantId]);
        
      });

    this.showErrorMessage = false;
  }

}
