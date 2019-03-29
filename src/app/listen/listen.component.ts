import { Component, OnInit } from '@angular/core';
import { Singer } from '../_models/singer';
//import { SINGERGENRES } from '../mock-singer-genres';
import { SingerService } from '../_services/singer.service';
import { HostListener } from '@angular/core';

function compare(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

@Component({
  selector: 'app-listen',
  templateUrl: './listen.component.html',
  styleUrls: ['./listen.component.css']
})
export class ListenComponent implements OnInit {
  filterCloseClicked = false;
  socialNetsBtnClicked = false;
  watchCheckboxChecked = false;
  singers: Singer[];
  filteredSingers: Singer[] = [];
  filteredSingerGenres: any[] = [];
  header: string;
  headerMobile: string;
  innerWidth: number = 0;
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
    ).sort(compare);
  }
  getGenres() {
    this.singerService.getGenres()
        .subscribe(genres => this.filteredSingerGenres = genres.data);
  }
  resetFilter() {
    this.filteredSingers = JSON.parse(JSON.stringify(this.singers)).sort(compare);
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
          this.singers = singers.data.sort(compare);
          this.filteredSingers = JSON.parse(JSON.stringify(this.singers));
          this.getRandomHeader();
        }
      );
  }
  constructor(
    private singerService: SingerService,
  ) {
    this.innerWidth = window.screen.width;
  }

  ngOnInit() {
    this.getSingers();
    this.getGenres();
  }

}
