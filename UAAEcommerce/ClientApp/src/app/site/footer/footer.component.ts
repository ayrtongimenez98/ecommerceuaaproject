import { Component, OnInit, Output, ElementRef, EventEmitter } from '@angular/core';
import { NgModule, ApplicationRef } from '@angular/core';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
declare var $: any;
declare var Instafeed: any;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
@NgModule({
  imports: [
  ],
})

export class FooterComponent implements OnInit {
  email = "";
  inputEmail = "";
  @Output() buttonClicked = new EventEmitter();
  mapClick() {
    window.open("https://goo.gl/maps/mVvswaqX7q1i7GCL7");
  };
  constructor(private el: ElementRef) { }
  ngOnInit() {
    this.inputEmail = "pruebaASDASD";
    var feed = new Instafeed({
    get: "user",
    userId: 4780680477,
    accessToken: "4780680477.1677ed0.3c6658c4d226452e9910e1b601b354ab",
    limit: 6,
    template: '<a href="{{link}}" class="p3_instagram_post"><img src="{{image}}" class="p3_instagram_square" style="width: 100%; height: 100%; object-fit: cover;" alt="" /></a>',
    resolution: 'standard_resolution',
  });
  feed.run();
  }
  
  
}

