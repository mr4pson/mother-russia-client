import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscribe-popup',
  templateUrl: './subscribe-popup.component.html',
  styleUrls: ['./subscribe-popup.component.css']
})
export class SubscribePopupComponent implements OnInit {
  @Input() active: boolean;
  @Output() onPopupClose = new EventEmitter<{active: boolean}>();
  constructor() { }
  closeSubscribePopup() {
    this.onPopupClose.emit( {active: false} );
  }
  ngOnInit() {
  }

}
