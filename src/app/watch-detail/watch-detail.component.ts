import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Watch } from '../_models/watch';
import { WatchGenre } from '../_models/watch-genre';
import { WatchService } from '../_services/watch.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
declare var $: any;

@Component({
  selector: 'app-watch-detail',
  templateUrl: './watch-detail.component.html',
  styleUrls: ['./watch-detail.component.css']
})
export class WatchDetailComponent implements OnInit {
  @ViewChild('video') video: NgxY2PlayerComponent;
  playerOptions: NgxY2PlayerOptions = {
    height: 410,
    width: 730,
    resizeDebounceTime: 0,
    playerVars: {
      autoplay: 0,
    },
    // aspectRatio: (3 / 4), // you can set ratio of aspect ratio to auto resize with
  };

  watches: Watch[] = [];
  watch: Watch;
  genres: WatchGenre[];
  innerWidth: number = 0;
  navigationSubscription;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private WatchService: WatchService,
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
    this.titleService.setTitle("Watch");
    this.getWatch();
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  getImageURL(imageUrl) {
    return this.imageService.getImageURL(imageUrl);
  }
  getGenres(): void {
    this.WatchService.getGenres().subscribe(genres => 
      {
        this.genres = genres.data.filter(
        genre => {
          return this.watch.genres.includes(genre.id);
        });
        this.getRelatedWatches();
      }
    );
  }
  getWatch(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.WatchService.getWatch(url)
      .subscribe(
        watch => {
          this.watch = watch.data;
          this.getGenres();
          this.title = "Watch - "+this.watch.name;
          this.titleService.setTitle(this.title);
          setTimeout(function() {
            var image = document.createElement('img');
            image.src = globals.getBgUrl($('.top-image-content')[0]);
            image.onload = function () {
              $('.loader-wrap').fadeOut();
            };
          }, 100);
        }
      );
  }
  getRelatedWatches(): void {
    this.WatchService.getWatches()
        .subscribe(watches => this.watches = watches.data.filter( 
          watch => {
            return watch.genres.some(genres => this.watch.genres.includes(genres)) && this.watch.id != watch.id;
          }).sort(function() {
            return .5 - Math.random();
          }).slice(0, 6)
        );
  }
  ngOnInit() {
    
  }
  onReady(event) {
    console.log('ready');                                                                                                                                                                                                                                                                 
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
