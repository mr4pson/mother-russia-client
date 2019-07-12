import { Component, OnInit } from '@angular/core';
import { Singer } from '../_models/singer';
import { Router, NavigationEnd } from '@angular/router';
import { SingerService } from '../_services/singer.service';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
declare var $: any;

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css']
})
export class ListenComponent implements OnInit {
  filterCloseClicked = false;
  watchCheckboxChecked = false;
  singers: Singer[];
  filteredSingers: Singer[] = [];
  filteredSingerGenres: any[] = [];
  header: string;
  headerMobile: string;
  innerWidth: number = 0;
  navigationSubscription;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  removeGenre(id) {
    let curGenre = this.filteredSingerGenres.find(genre => genre.id === id);
    curGenre.active = !curGenre.active;
  }
  applyFilter() {
    this.filteredSingers = this.singers.filter(singer => 
      this.filteredSingerGenres.filter(genre => {
        return singer.genres.includes(genre.id) && genre.active;
      }).length > 0
    ).sort(function() {
      return .5 - Math.random();
    });/*.sort(compare);*/
  }
  getGenres() {
    this.singerService.getGenres()
        .subscribe(genres => this.filteredSingerGenres = genres.data);
  }
  resetFilter() {
    this.filteredSingers = JSON.parse(JSON.stringify(this.singers)).sort(function() {
      return .5 - Math.random();
    });/*.sort(compare);*/
    this.getGenres();
  }
  getRandomHeader() {
    let randomSinger = this.singers.sort( function() { return 0.5 - Math.random() } )[0];
    this.header = randomSinger.header;
    this.headerMobile = randomSinger.headerMobile;
    setTimeout(function() {
      var image = document.createElement('img');
      image.src = globals.getBgUrl($('.top-image-content')[0]);
      image.onload = function () {
        $('.loader-wrap').fadeOut();
      };
    }, 100);
  }
  getSingers(): void {
    this.singerService.getSingers()
      .subscribe(singers => 
        {
          this.singers = singers.data.sort(function() {
            return .5 - Math.random();
          });/*.sort(compare);*/
          this.filteredSingers = JSON.parse(JSON.stringify(this.singers));
          this.getRandomHeader();
        }
      );
  }
  constructor(
    private singerService: SingerService,
    private titleService:Title,
    private router: Router,
    private imageService: ImageService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  initialiseInvites() {
    $('.loader-wrap').show();
    this.innerWidth = window.screen.width;
    this.title = "Listen";
    this.titleService.setTitle(this.title);
    this.getSingers();
    this.getGenres();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
