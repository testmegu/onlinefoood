import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../service/restaurant.service';

@Component({
  selector: 'app-restaurant-portal',
  templateUrl: './restaurant-portal.component.html',
  styleUrls: ['./restaurant-portal.component.css']
})
export class RestaurantPortalComponent implements OnInit {

  restaurantId: number;
  restaurant: Restaurant;

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService) { }

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

}
