import { Component, OnInit } from '@angular/core';
import { BookService } from '../_services/book.service';
import { Book } from '../_models/book';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  socialNetsBtnClicked = false;
  classicBooks: Book[] = [];
  modernBooks: Book[] = [];
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
        //console.log(this.classicBooks, this.modernBooks);
      });
  }
  constructor(
    private BookService: BookService,
  ) { }

  ngOnInit() {
    this.getBooks();
  }

}
