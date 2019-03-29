import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
  hideMenu() {
    let hamburger: HTMLElement = document.getElementById('hamburger');
    hamburger.click();
  }
  constructor() { }

  ngOnInit() {
  }

}
