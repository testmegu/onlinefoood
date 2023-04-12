import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/model/restaurant';
import { RestaurantService } from 'src/app/service/restaurant.service';

@Component({
  selector: 'app-update-restaurant',
  templateUrl: './update-restaurant.component.html',
  styleUrls: ['./update-restaurant.component.css']
})
export class UpdateRestaurantComponent implements OnInit {

  restaurant: Restaurant;
  restaurantId: number;

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute, private router: Router) { }

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

  update()
  {
    this.restaurantService.updateRestaurant(this.restaurantId,this.restaurant).subscribe(data =>{

      console.log(data);
      this.restaurant = data;
    });
    this.back();
  }

  back()
  {
    this.router.navigate(['restaurant',this.restaurantId,'details']);
  }

}
