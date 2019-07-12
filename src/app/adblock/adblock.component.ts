import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-adblock',
  templateUrl: './adblock.component.html',
  styleUrls: ['./adblock.component.css']
})
export class AdblockComponent implements OnInit {
  barShown: boolean = true;
  @Output() showInstructions = new EventEmitter<boolean>();
  constructor() { }
  onShowInstructions(){
    this.showInstructions.emit( true );
  }
  hideBar() {
    this.barShown = false;
    this.showInstructions.emit( false );
  }
  ngOnInit() {
  }

}
