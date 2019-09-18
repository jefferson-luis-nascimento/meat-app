import { Component, OnInit } from '@angular/core';


import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.services';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html'
})
export class RestaurantsComponent implements OnInit {

  restaurants: Restaurant[];

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.restaurantsService.restaurants()
      .subscribe(
        restaurants => {
          this.restaurants = restaurants;
        },
        err => {
          console.log(`${typeof err} => ${err.error}`);
        }
      );
  }
}
