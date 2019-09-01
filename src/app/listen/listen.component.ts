import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Singer } from '../_models/singer';
import { Router, NavigationEnd } from '@angular/router';
import { SingerService } from '../_services/singer.service';
import { HostListener } from '@angular/core';
import { ImageService } from './../_services/image.service';
import { PageService } from './../_services/page.service';
import { Title, Meta } from "@angular/platform-browser";
import { Page } from './../_models/page';

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
    this.innerWidth = this.window.innerWidth;
  }
  constructor(@Inject(WINDOW) private window: Window, 
    private singerService: SingerService,
    private titleService:Title,
    private router: Router,
    private imageService: ImageService,
    private pageService: PageService,
    private meta: Meta
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    
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
    });
  }
  getGenres() {
    this.singerService.getGenres()
        .subscribe(genres => this.filteredSingerGenres = genres.data);
  }
  resetFilter() {
    this.filteredSingers = JSON.parse(JSON.stringify(this.singers)).sort(function() {
      return .5 - Math.random();
    });
    this.getGenres();
  }
  getRandomHeader() {
    let randomSinger = this.singers.sort( function() { return 0.5 - Math.random() } )[0];
    this.header = randomSinger.header;
    this.headerMobile = randomSinger.headerMobile;
  }
  getSingers(): void {
    this.singerService.getSingers()
      .subscribe(singers => 
        {
          this.singers = singers.data.sort(function() {
            return .5 - Math.random();
          });
          this.filteredSingers = JSON.parse(JSON.stringify(this.singers));
          this.getRandomHeader();
        }
      );
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  initialiseInvites() {
    this.innerWidth = this.window.screen.width;
    this.title = "Listen";
    this.titleService.setTitle(this.title);
    this.pageService.getPageData('/listenPage').subscribe(pageData => {
      let page: Page = pageData.data;
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
    this.getSingers();
    this.getGenres();
  }
  onClickFilterClose() {
    this.filterCloseClicked = !this.filterCloseClicked;
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
