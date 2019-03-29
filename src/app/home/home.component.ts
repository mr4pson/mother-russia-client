import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideConfig = {
    "dots": true,
    "arrows": false,
    "infinite": true,
    "slidesToShow": 1,
    "autoplay": true,
    "autoplaySpeed": 6000,
    "pauseOnHover": false,
    "speed": 1500,
    "cssEase": 'cubic-bezier(0.950, 0.050, 0.195, 0.935)',
  };
  slickInit(e) {
    //console.log('slick initialized');
  }
  
  breakpoint(e) {
    //console.log('breakpoint');
  }
  
  afterChange(e) {
    //console.log('afterChange');
  }
  
  beforeChange(e) {
    //console.log('beforeChange');
  }

  constructor() { }

  ngOnInit() {
  }

}
