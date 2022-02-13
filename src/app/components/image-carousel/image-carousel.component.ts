import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit, OnChanges {

  @Input() percentage:any;
  @Input() title:string = '';

  currentImageIndex:number = 1;
  numberOfImages:number = 5;

  currentThreshold:number = 0;
  imageIndexByScrollPercentage:any = {
    0: 1,
    20: 2,
    40: 3,
    60: 4,
    80: 5
  }

  scrollThresholds: any = Object.keys(this.imageIndexByScrollPercentage);

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentScrollThreshold();

    this.currentImageIndex = this.imageIndexByScrollPercentage[this.currentThreshold];
    this.scrollToImageIndex();
  }

  getCurrentScrollThreshold () {
    if (this.percentage <= this.scrollThresholds[0]) {
      this.currentThreshold = this.scrollThresholds[0];
      return;
    }

    if (this.percentage >= this.scrollThresholds[this.scrollThresholds.length - 1]) {
      this.currentThreshold = this.scrollThresholds[this.scrollThresholds.length - 1];
      return;
    }

    this.currentThreshold = this.scrollThresholds.find((threshold:number, index:number) => {
      let nextThreshold = this.scrollThresholds[index + 1];
      return (this.percentage >= threshold && this.percentage <= nextThreshold);
    });
  }

  scrollToImageIndex () {
    const nextImage = document.getElementById(`${this.title}-img-${this.currentImageIndex}`);
    nextImage?.scrollIntoView();
  }

  scrollToNextImage () {
    this.currentImageIndex++;
    this.scrollToImageIndex();
  }

}
