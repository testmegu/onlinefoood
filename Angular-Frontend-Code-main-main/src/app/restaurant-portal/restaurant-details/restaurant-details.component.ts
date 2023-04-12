import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurantId: number;
  restaurant: Restaurant;
  
  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private router:Router) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params =>
      {
        this.restaurantId = +params.get("id");
      });

    this.restaurantService.getRestaurant(this.restaurantId).subscribe(data =>
      {
        console.log(data);
        this.restaurant = data;
      }, error => console.log(error));
  }

  backToPortal()
  {
    this.router.navigate(['restaurant', this.restaurantId]);
  }

  goUpdate()
  {
    this.router.navigate(['restaurant',this.restaurantId,'details','update']);
  }

}
