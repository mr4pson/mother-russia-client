import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageSectionService } from '../_services/language-section.service';
import { LanguageSection } from '../_models/language-section';
import { RussianLanguageService } from '../_services/russian-language-service.service';
import { RussianLanguage } from '../_models/russianLanguage';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-russian-language',
  templateUrl: './russian-language.component.html',
  styleUrls: [
    './russian-language.component.css',
    './froala_style.min.css'
  ]
})
export class RussianLanguageComponent implements OnInit {
  socialNetsBtnClicked = false;
  component: RussianLanguage;
  sections: LanguageSection[] = [];
  categoryBtnsClicked = [];
  categoryChildWrapsHeight = [];
  curCategory: any = {name: 'Russian language'};
  leftBarVisible: boolean = false;
  categoryType: string;
  innerWidth: number = 0;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  constructor(
    private languageSectionService: LanguageSectionService,
    private russianLanguageService: RussianLanguageService,
    private route: ActivatedRoute,
  ) {
    this.innerWidth = window.screen.width;
  }
  getSections(): void {
    this.languageSectionService.getSections()
      .subscribe(sections => {
        this.sections = sections.data;
        console.log(this.sections);
        this.sections.forEach(section => {
          section.categories.forEach((category, index) => {
            if (category.subCategories.length > 0) {
              this.categoryBtnsClicked[category.id] = false;
            }
            this.categoryChildWrapsHeight[category.id] = category.subCategories.length*24;
          });
        });
        if (!this.categoryType) {
          this.curCategory = this.sections[0].categories[0];
          this.getCategory(this.curCategory.url);
        }
      });
  }
  getComponent(): void {
    this.russianLanguageService.getComponent()
      .subscribe(component => {
        this.component = component.data;
      });
  }
  getCategory(url): void {
    this.languageSectionService.getCategory(url)
      .subscribe(category => {
        this.curCategory = category.data;
        console.log(this.curCategory);
      })
  }
  getSubCategory(url): void {
    this.languageSectionService.getSubCategory(url)
      .subscribe(category => {
        this.curCategory = category.data;
      })
  }
  rowClick(type, category) {
    this.leftBarVisible = false;
    if (type == 'category') {
      this.getCategory(category.url);
    } else {
      this.getSubCategory(category.url);
    }
  }
  ngOnInit() {
    this.getSections();
    this.getComponent();
    this.categoryType = this.route.snapshot.paramMap.get('categoryType');
    const url = this.route.snapshot.paramMap.get('url');
    if (this.categoryType == 'category' && url) {
      this.getCategory(url);
    } else if (url) {
      this.getSubCategory(url);
    }
  }

}
