import { 
  Component, 
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-song-text',
  templateUrl: './song-text.component.html',
  styleUrls: ['./song-text.component.css']
})
export class SongTextComponent implements OnInit {
  @Input() set setSongText(songText: string) {
    this.songTextSplited = songText.split('\n');
  }
  @Input() hoveredRow: any;
  @Output() onHoverRow = new EventEmitter<{hoveredRowNumber: number}>();
  songTextSplited: any[];
  constructor() {
 
  }
  onRowHover(index){
    this.onHoverRow.emit( {hoveredRowNumber: index} );
  }
  onRowUnHover() {
    this.onHoverRow.emit( {hoveredRowNumber: null} );
  }
  ngOnInit() {
    
    //console.log(this.songText);
  }

}
