import { 
  Component, 
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { 
  Options, 
  ChangeContext
} from 'ng5-slider';

@Component({
  selector: 'app-watch-slider',
  templateUrl: './watch-slider.component.html',
  styleUrls: ['./watch-slider.component.scss']
})
export class WatchSliderComponent implements OnInit {
  @Input() filterDates: {minDate: number, maxDate: number};
  @Output() onSelectValue = new EventEmitter<{minDate: number , maxDate: number}>();
  options: Options = {
    floor: 1961,
    ceil: 2018,
    step: 1,
    ticksArray: [1961, 1975, 1989, 2003, 2018],
    showTicksValues: true,
    
  };
  minDate: number;
  maxDate: number;
  onUserChange(changeContext: ChangeContext): void {
    this.minDate = changeContext.value;
    this.maxDate = changeContext.highValue;
    this.onSelectValue.emit( {minDate: this.minDate, maxDate:this.maxDate} );
  }

  constructor() {

  }
 
  ngOnInit() {
    
  }

}
