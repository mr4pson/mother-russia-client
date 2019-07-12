import { Component, OnInit } from '@angular/core';
import { Watch } from '../_models/watch';
import { WatchService } from '../_services/watch.service';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
declare var $: any;

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  filterCloseClicked = false;
  watchCheckboxChecked = false;
  watches: Watch[] = [];
  filteredWatches: Watch[] = [];
  filteredWatchGenres: any[];
  header: string;
  headerMobile: string;
  filterDates:{minDate: number, maxDate: number} = {minDate: 1961 , maxDate: 2018};
  currentStart = 1961;
  currentEnd = 2018;
  innerWidth: number = 0;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  removeGenre(id) {
    let curGenre = this.filteredWatchGenres.find(genre => genre.id === id);
    curGenre.active = !curGenre.active;
  }
  selectValue( values : any ) {
    this.currentStart = values.minDate;
    this.currentEnd = values.maxDate;
    console.log(values);
  }
  applyFilter() {
    this.filteredWatches = this.watches.filter(watch => 
      watch.year >= this.currentStart && 
      watch.year <= this.currentEnd && 
      this.filteredWatchGenres.filter(genre => {
        return watch.genres.includes(genre.id) && genre.active;
      }).length > 0 &&
      (watch.youtube.trim() !== '' && this.watchCheckboxChecked || !this.watchCheckboxChecked)
    ).sort(function() {
      return .5 - Math.random();
    });/*.sort(compare);*/
  }
  getGenres() {
    this.WatchService.getGenres()
        .subscribe(genres => this.filteredWatchGenres = genres.data);
  }
  resetFilter() {
    //this.filteredWatches = JSON.parse(JSON.stringify(this.watches)).sort(compare);
    this.filteredWatches = JSON.parse(JSON.stringify(this.watches)).sort(function() {
      return .5 - Math.random();
    });
    this.getGenres();
    this.currentStart = 1961;
    this.currentEnd = 2018;
    this.watchCheckboxChecked = false;
    this.filterDates = {minDate: 1961 , maxDate: 2018};
  }
  getRandomHeader() {
    let randomWatch = this.watches.sort( function() { return 0.5 - Math.random() } )[0];
    this.header = randomWatch.header;
    this.headerMobile = randomWatch.headerMobile;
    setTimeout(function() {
      var image = document.createElement('img');
      image.src = globals.getBgUrl($('.top-image-content')[0]);
      image.onload = function () {
        $('.loader-wrap').fadeOut();
      };
    }, 100);
  }
  getWatches(): void {
    this.WatchService.getWatches()
      .subscribe(watches => 
        {
          this.watches = watches.data.sort(function() {
            return .5 - Math.random();
          });/*.sort(compare);*/
          this.filteredWatches = JSON.parse(JSON.stringify(this.watches));
          this.getRandomHeader();
        }
      );
  }

  constructor(
    private WatchService: WatchService,
    private titleService:Title,
    private imageService: ImageService
  ) {
    this.innerWidth = window.screen.width;
    this.title = "Watch";
    this.titleService.setTitle(this.title);
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  ngOnInit() {
    $('.loader-wrap').show();
    this.getWatches();
    this.getGenres()
  }

}
