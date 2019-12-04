import {Component, OnDestroy, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit, OnDestroy {

  private carouselMain: any;
  private carouselNav: any;

  constructor() { }

  ngOnInit() {
    this.carouselMain = $('.carousel-main').flickity({
      prevNextButtons: true,
      pageDots: false,
      autoPlay: true,
    });

    this.carouselNav = $('.carousel-nav').flickity({
      asNavFor: '.carousel-main',
      contain: true,
      pageDots: false,
      prevNextButtons: false,
    });
  }

  ngOnDestroy(): void {
    this.carouselMain.flickity('destroy');
    this.carouselNav.flickity('destroy');
  }
}
