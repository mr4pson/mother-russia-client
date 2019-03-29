import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Watch } from '../_models/watch';
import { WatchGenre } from '../_models/watch-genre';
import { WatchService } from '../_services/watch.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import { concatAll } from 'rxjs/operators';
import { HostListener } from '@angular/core';


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

  socialNetsBtnClicked = false;
  watches: Watch[] = [];
  watch: Watch;
  genres: WatchGenre[];
  innerWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private route: ActivatedRoute,
    private WatchService: WatchService,
    private location: Location
  ) {
    this.innerWidth = window.screen.width;
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
    const id = +this.route.snapshot.paramMap.get('id');
    this.WatchService.getWatch(id)
      .subscribe(
        watch => {
          this.watch = watch.data;
          console.log(this.watch);
          this.getGenres();
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
    this.getWatch();
  }
  onReady(event) {
    console.log('ready');                                                                                                                                                                                                                                                                 
  }

}
