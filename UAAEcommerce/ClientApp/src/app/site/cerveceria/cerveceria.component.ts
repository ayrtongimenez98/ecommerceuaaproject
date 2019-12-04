import {Component, OnDestroy, OnInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-cerveceria',
  templateUrl: './cerveceria.component.html',
  styleUrls: ['./cerveceria.component.css']
})
export class CerveceriaComponent implements OnInit, OnDestroy {
  private $carousel: any;

  ngOnInit() {
    this.$carousel = $('.cerveceria');
    this.$carousel.hide();
    this.$carousel.flickity({
      fullscreen: true,
      cellSelector: ".picture-cell",
      autoPlay: true,
      freeScroll: true,
      wrapAround: true,
      pageDots: true,
      prevNextButtons: false,
      lazyLoad: 2
    });
    $('#view-fullscreen-button').on('click', () => {
      this.$carousel.show();
      this.$carousel.flickity('viewFullscreen');
    });
    $('.flickity-fullscreen-button-exit').on('click', () => {
      this.$carousel.hide();
      this.$carousel.flickity('exitFullscreen');
    });
  }

  ngOnDestroy(): void {
    this.$carousel.flickity('destroy');
  }
}

