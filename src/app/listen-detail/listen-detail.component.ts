import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Singer } from '../_models/singer';
import { Song } from '../_models/song';
import { SingerService } from '../_services/singer.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-listen-detail',
  templateUrl: './listen-detail.component.html',
  styleUrls: ['./listen-detail.component.css']
})
export class ListenDetailComponent implements OnInit {
  @ViewChild('video') video: NgxY2PlayerComponent;
  videoId: 'z8WdQsPknf0';
  playerOptions: NgxY2PlayerOptions = {
    height: 410,
    width: 730,
    resizeDebounceTime: 0,
    playerVars: {
      autoplay: 0,
    },
    // aspectRatio: (3 / 4), // you can set ratio of aspect ratio to auto resize with
  };
  singer: Singer;
  songActive: Song = {id: 0, name: '', nameRus: '', translit: '', youtube: '', rusLyrics: '', engLyrics: ''};
  socialNetsBtnClicked = false;
  hoveredRow = null;
  mobileLirycs = true;
  innerWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private SingerService: SingerService,
    private location: Location
  ) {
    this.innerWidth = window.screen.width;
  }
  getSinger(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.SingerService.getSinger(id)
      .subscribe(singer => {
        /*singer.tracklist.forEach(song => {
          let splitedLyricsRus = song.rusLyrics.split('\n');
          let resturctLyrucsRus = '';
          splitedLyricsRus.forEach(row => {
            resturctLyrucsRus = resturctLyrucsRus + '<div class="lyrics-row">'+row+'</div>';
          });
          song.rusLyrics = resturctLyrucsRus;
          let splitedLyricsEng = song.engLyrics.split('\n');
          let resturctLyrucsEng = '';
          splitedLyricsEng.forEach(row => {
            resturctLyrucsEng = resturctLyrucsEng + '<div class="lyrics-row">'+row+'</div>';
          });
          song.engLyrics = resturctLyrucsEng;
        });*/
        
        this.singer = singer.data;
        this.singer.tracklist.length > 0 ? this.songActive = this.singer.tracklist[0] : null;
      });
  }
  changeLyrics(value) {
    this.mobileLirycs = value;
  }
  changeActiveTrack(track) {
    this.songActive = track;
  }
  hoverRow(event) {
    this.hoveredRow = event.hoveredRowNumber;
  }
  ngOnInit() {
    this.getSinger();
    console.log(this.singer);
  }

}
