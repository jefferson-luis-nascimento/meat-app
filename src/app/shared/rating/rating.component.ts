import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  rates: number[] = [1, 2, 3, 4, 5];
  rate: number = 0;
  previuosRate: number;

  @Output() rated = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number): void {
    this.rate = rate;
    this.previuosRate = undefined;
    this.rated.emit(this.rate);
  }

  setTemporaryRate(rate: number): void {
    if (this.previuosRate === undefined) {
      this.previuosRate = rate;
    }

    this.rate = rate;
  }

  clearTemporaryRate(): void {
    if (this.previuosRate !== undefined) {
      this.rate = this.previuosRate;
      this.previuosRate = undefined;
    }
    
  }
}
