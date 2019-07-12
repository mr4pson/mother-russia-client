import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Singer } from '../_models/singer';
import { Song } from '../_models/song';
import { SingerService } from '../_services/singer.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
declare var $: any;

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
  hoveredRow = null;
  mobileLirycs = true;
  innerWidth: number = 0;
  navigationSubscription;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private SingerService: SingerService,
    private location: Location,
    private titleService:Title,
    private imageService: ImageService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    $('.loader-wrap').show();
    this.innerWidth = window.screen.width;
    this.titleService.setTitle("Listen");
    this.getSinger();
  }
  getSinger(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.SingerService.getSinger(url)
      .subscribe(singer => {
        this.singer = singer.data;
        this.singer.tracklist.length > 0 ? this.songActive = this.singer.tracklist[0] : null;
        this.title = "Listen - " + this.singer.name;
        this.titleService.setTitle(this.title);
        setTimeout(function() {
          var image = document.createElement('img');
          image.src = globals.getBgUrl($('.top-image-content')[0]);
          image.onload = function () {
            $('.loader-wrap').fadeOut();
          };
        }, 100);
      });
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
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
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
