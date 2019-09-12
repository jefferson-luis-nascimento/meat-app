import { Component, OnInit } from '@angular/core';
import { RestaurantsService } from '../../restaurants/restaurants.services';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {

  reviews: Observable<any>;

  constructor(private restaurantService: RestaurantsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.reviews = this.restaurantService.reviews(this.route.parent.snapshot.params["id"]);
    console.log(this.reviews);
  }

}
