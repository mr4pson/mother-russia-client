import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { globals } from '../globals';
declare var $: any;

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  constructor(
    private titleService:Title
  ) {
    this.titleService.setTitle("Learn");
  }

  ngOnInit() {
    $('.loader-wrap').show();
    setTimeout(function() {
      var image = document.createElement('img');
      image.src = globals.getBgUrl($('.top-image-content')[0]);
      image.onload = function () {
        $('.loader-wrap').fadeOut();
      };
    }, 100);
  }

}
