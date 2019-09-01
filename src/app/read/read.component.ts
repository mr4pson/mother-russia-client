import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';
import { Router, NavigationEnd } from '@angular/router';
import { Book } from '../_models/book';
import { ImageService } from './../_services/image.service';
import { PageService } from './../_services/page.service';
import { Title, Meta } from "@angular/platform-browser";
import { Page } from './../_models/page';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  classicBooks: Book[] = [];
  modernBooks: Book[] = [];
  navigationSubscription;
  title: string;
  constructor(
    private BookService: BookService,
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
  getBooks(): void {
    this.BookService.getBooks()
      .subscribe(books => {
        console.log(books);
        this.classicBooks = books.data.filter(book => {
          return book.author.categoryId == 1
        });
        this.modernBooks = books.data.filter(book => {
          return book.author.categoryId == 2
        });
      });
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  initialiseInvites() {
    this.pageService.getPageData('/readPage').subscribe(pageData => {
      let page: Page = pageData.data;
      this.title = "Read";
      this.titleService.setTitle(page.metaTitle);
      this.meta.updateTag({name: 'description', content: page.metaDescription});
    }, error => {
      alert('Network issues. Please, reload the page.');
    });
    this.getBooks();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
