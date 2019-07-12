import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blocker-instructions',
  templateUrl: './blocker-instructions.component.html',
  styleUrls: ['./blocker-instructions.component.css']
})
export class BlockerInstructionsComponent implements OnInit {
  @Input() instructionsShown: boolean;
  constructor() { }

  ngOnInit() {
  }

}
