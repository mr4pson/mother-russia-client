import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { Author } from '../_models/bookAuthor';
@Component({
  selector: 'app-read-detail',
  templateUrl: './read-detail.component.html',
  styleUrls: ['./read-detail.component.css']
})
export class ReadDetailComponent implements OnInit {
  socialNetsBtnClicked = false;
  author: Author;
  relatedBooks: Book[] = [];
  constructor(
    private route: ActivatedRoute,
    private BookService: BookService,
    private location: Location
  ) { }
  getAuthor(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.BookService.getAuthor(id)
      .subscribe(author => 
        {
          this.author = author.data;
          console.log(this.author);
          this.getRelatedBooks();
        }
      );
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
    this.getAuthor();
  }

}
