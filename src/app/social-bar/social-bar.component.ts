import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-bar',
  templateUrl: './social-bar.component.html',
  styleUrls: ['./social-bar.component.css']
})
export class SocialBarComponent implements OnInit {
  socialNetsBtnClicked = false;
  titleEncoded: string;
  @Input() type: string;
  pagePath: string;
  @Input() vertical: boolean;
  @Input() title: string;
  constructor() {
    this.pagePath = window.location.href;
  }
  ngOnInit() {
  }

}
