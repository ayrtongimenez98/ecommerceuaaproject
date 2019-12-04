import {Component, OnDestroy, OnInit} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  private carrusel: any;

  constructor() { }

  ngOnInit() {
    this.carrusel = $('.flick').flickity({
      cellSelector: ".carrusel-item",
      draggable: false,
      autoPlay: 2500,
      prevNextButtons: false,
      pageDots: false
    });
  }

  ngOnDestroy(): void {
    this.carrusel.flickity('destroy');
  }
}
