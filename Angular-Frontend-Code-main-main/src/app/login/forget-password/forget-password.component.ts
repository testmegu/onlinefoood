import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/model/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  roles = ['customer', 'restaurant'];
  role: string;
  username: string;
  email: string;
  user: any;
  userExist = false;
  showErrorMessage = false;
  
  constructor(private customerService: CustomerService, private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    this.role = "customer";
  }

  onSubmit()
  {
    if (this.role == "customer")
    {
      this.customerService.getCustomerByUsernameAndEmail(this.username, this.email).subscribe(data =>{
        this.user = data;
        this.userExist = true;
      },erorr =>{
        this.showErrorMessage = true;
      });
    }
    else
    {
      this.restaurantService.getRestaurantByUsernameAndEmail(this.username, this.email).subscribe(data =>{
        this.user = data;
        this.userExist = true;
      },erorr =>{
        this.showErrorMessage = true;
      });
    }
  }



}
