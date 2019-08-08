import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';
import { Router, NavigationEnd } from '@angular/router';
import { Book } from '../_models/book';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ImageService } from './../_services/image.service';
//declare var $: any;

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
        // setTimeout(function() {
        //   var image = document.createElement('img');
        //   image.src = globals.getBgUrl($('.top-image-content')[0]);
        //   image.onload = function () {
        //     $('.loader-wrap').fadeOut();
        //   };
        // }, 100);
      });
  }
  constructor(
    private BookService: BookService,
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
    //$('.loader-wrap').show();
    this.title = "Read";
    this.titleService.setTitle(this.title);
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
