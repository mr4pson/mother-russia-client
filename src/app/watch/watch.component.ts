import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Watch } from '../_models/watch';
import { WatchService } from '../_services/watch.service';
import { HostListener } from '@angular/core';
import { PageService } from './../_services/page.service';
import { Title, Meta } from "@angular/platform-browser";
import { Page } from './../_models/page';
import { ImageService } from './../_services/image.service';

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
    this.innerWidth = this.window.innerWidth;
  }
  constructor(@Inject(WINDOW) private window: Window, 
    private WatchService: WatchService,
    private titleService:Title,
    private imageService: ImageService,
    private pageService: PageService,
    private meta: Meta
  ) {
    this.innerWidth = window.screen.width;
    this.pageService.getPageData('/watchPage').subscribe(pageData => {
      let page: Page = pageData.data;
      this.title = "Watch";
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
  }
  removeGenre(id) {
    let curGenre = this.filteredWatchGenres.find(genre => genre.id === id);
    curGenre.active = !curGenre.active;
  }
  selectValue( values : any ) {
    this.currentStart = values.minDate;
    this.currentEnd = values.maxDate;
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
    });
  }
  getGenres() {
    this.WatchService.getGenres()
        .subscribe(genres => this.filteredWatchGenres = genres.data);
  }
  resetFilter() {
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
  }
  getWatches(): void {
    this.WatchService.getWatches()
      .subscribe(watches => 
        {
          this.watches = watches.data.sort(function() {
            return .5 - Math.random();
          });
          this.filteredWatches = JSON.parse(JSON.stringify(this.watches));
          this.getRandomHeader();
        }
      );
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  ngOnInit() {
    this.getWatches();
    this.getGenres()
  }

}
