import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, ViewChild , Inject} from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Singer } from '../_models/singer';
import { Song } from '../_models/song';
import { SingerService } from '../_services/singer.service';
import { NgxY2PlayerComponent, NgxY2PlayerOptions } from 'ngx-y2-player';
import { HostListener } from '@angular/core';
import { Title, Meta } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';

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
    this.innerWidth = this.window.innerWidth;
  }
  constructor(@Inject(WINDOW) private window: Window, 
    private route: ActivatedRoute,
    private router: Router,
    private SingerService: SingerService,
    private location: Location,
    private titleService:Title,
    private imageService: ImageService,
    private meta: Meta
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.innerWidth = this.window.screen.width;
    this.titleService.setTitle("Listen");
    this.getSinger();
  }
  getSinger(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.SingerService.getSinger(url).subscribe(singer => {
      this.singer = singer.data;
      this.singer.tracklist.length > 0 ? this.songActive = this.singer.tracklist[0] : null;
      this.title = this.singer.metaTitle;
      this.titleService.setTitle(this.singer.metaTitle);
      this.meta.updateTag({name: 'description', content: this.singer.metaDescription});
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
