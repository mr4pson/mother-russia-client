import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SearchService } from '../_services/search.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navigationSubscription;
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }
  initialiseInvites() {
    this.phrase = '';
  };
  phrase: string;
  searchedLinks: any[];
  searchForm = new FormGroup({
    phrase: new FormControl(''),
  });
  searchFocused = false;
  liHovered1 = false;
  liHovered2 = false;
  liHovered3 = false;
  liHovered4 = false;
  liHovered5 = false;
  liMenuHovered1 = false;
  liMenuHovered2 = false;
  liMenuHovered3 = false;
  liMenuHovered4 = false;
  onSearch(e) {
    if (e.keyCode === 27) {
      this.phrase = '';
    }
    if (!(this.phrase == '')) {
      this.searchService.search(this.phrase).subscribe(searchedLinks => {
        this.searchedLinks = searchedLinks.data
        console.log(this.searchedLinks);
      });
    }
  }
  hideMenu() {
    let hamburger: HTMLElement = document.getElementById('hamburger');
    hamburger.click();
    this.searchedLinks = [];
    this.phrase = '';
  }
 

  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
