import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { Author } from '../_models/bookAuthor';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
//declare var $: any;

@Component({
  selector: 'app-read-detail',
  templateUrl: './read-detail.component.html',
  styleUrls: ['./read-detail.component.css']
})
export class ReadDetailComponent implements OnInit {
  author: Author;
  relatedBooks: Book[] = [];
  navigationSubscription;
  title: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private BookService: BookService,
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
    //$('.loader-wrap').show();
    this.titleService.setTitle("Read");
    this.getAuthor();
  }
  getAuthor(): void {
    const url = this.route.snapshot.paramMap.get('url');
    this.BookService.getAuthor(url)
      .subscribe(author => 
        {
          this.author = author.data;
          console.log(this.author);
          this.getRelatedBooks();
          this.title = "Read - " + this.author.name;
          this.titleService.setTitle(this.title);
          // setTimeout(function() {
          //   var image = document.createElement('img');
          //   image.src = globals.getBgUrl($('.top-image-content')[0]);
          //   image.onload = function () {
          //     $('.loader-wrap').fadeOut();
          //   };
          // }, 100);
        }
      );
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  getRelatedBooks(): void {
    this.BookService.getBooks()
        .subscribe(books => this.relatedBooks = books.data.filter( 
          book => {
            return book.author.categoryId == this.author.categoryId && this.author.id != book.author.id;
          }).sort(function() {
            return .5 - Math.random();
          }).slice(0, 6)
        );
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
