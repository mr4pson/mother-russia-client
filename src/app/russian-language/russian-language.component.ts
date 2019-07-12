import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { LanguageSectionService } from '../_services/language-section.service';
import { LanguageSection } from '../_models/language-section';
import { RussianLanguageService } from '../_services/russian-language-service.service';
import { ConjugatedVerbService } from '../_services/conjugated-verb.service';
import { RussianLanguage } from '../_models/russianLanguage';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { Title } from "@angular/platform-browser";
import { ConjugatedVerb } from '../_models/conjugated-verb';
import { ImageService } from './../_services/image.service';

declare var $: any;

@Component({
  selector: 'app-russian-language',
  templateUrl: './russian-language.component.html',
  styleUrls: [
    './russian-language.component.css',
    './froala_style.min.css'
  ]
})
export class RussianLanguageComponent implements OnInit {
  component: RussianLanguage;
  sections: LanguageSection[] = [];
  categoryBtnsClicked = [];
  categoryChildWrapsHeight = [];
  curCategory: any = {name: 'Russian language'};
  leftBarVisible: boolean = false;
  categoryType: string;
  innerWidth: number = 0;
  title: string;
  items: ConjugatedVerb[];
  groupedItems: any[] = [];
  curGroup: any;
  letters = globals.letters;
  conjLink: string = '/Russian-language/subCategory/Russian-Conjugated-Verbs/';
  urlverb: string;
  urlParam: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  navigationSubscription;
  constructor(
    private languageSectionService: LanguageSectionService,
    private russianLanguageService: RussianLanguageService,
    private conjugatedVerbService: ConjugatedVerbService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.innerWidth = window.screen.width;
    this.categoryType = this.route.snapshot.paramMap.get('categoryType');
    this.urlParam = this.route.snapshot.paramMap.get('url');
    this.urlverb = this.route.snapshot.paramMap.get('urlverb');
    if (this.categoryType == 'category' && this.urlParam) {
      this.getCategory(this.urlParam);
    } else if (this.urlParam) {
      this.getSubCategory(this.urlParam);
    }
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  getSections(): void {
    this.languageSectionService.getSections()
      .subscribe(sections => {
        this.sections = sections.data;
        this.sections.forEach(section => {
          section.categories.forEach((category, index) => {
            if (category.subCategories.length > 0 && section.id != 1) {
              this.categoryBtnsClicked[category.id] = false;
            } else {
              this.categoryBtnsClicked[category.id] = true;
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
        setTimeout(function() {
          var image = document.createElement('img');
          image.src = globals.getBgUrl($('.top-image-content')[0]);
          image.onload = function () {
            $('.loader-wrap').fadeOut();
          };
        }, 100);
      });
  }
  getCategory(url): void {
    this.languageSectionService.getCategory(url)
      .subscribe(category => {
        category.data.content = globals.createGifffer(category.data.content);
        this.curCategory = category.data;
        this.title = "Russian language - " + this.curCategory.name;
        this.titleService.setTitle(this.title);
      })
  }
  getConjugatedVerbs() {
    this.conjugatedVerbService.getConjugatedVerbs().subscribe(items => {
      this.items = items.data.sort(globals.compare);
      this.groupedItems = [];
      let groupedData = this.items.reduce((r, e) => {
        let group = e.name[0].toUpperCase();
        if(!r[group]) r[group] = {group, children: [e]}
        else r[group].children.push(e);
        return r;
      }, {})
      groupedData['Ё'] = {group: 'Ё', children: []};
      groupedData['Ф'] = {group: 'Ф', children: []};
      groupedData['Ш'] = {group: 'Ш', children: []};
      groupedData['Щ'] = {group: 'Щ', children: []};
      groupedData['Ь'] = {group: 'Ь', children: []};
      groupedData['Ы'] = {group: 'Ы', children: []};
      groupedData['Ъ'] = {group: 'Ъ', children: []};
      groupedData['Э'] = {group: 'Э', children: []};
      groupedData['Ю'] = {group: 'Ю', children: []};
      let keys = Object.keys(groupedData);
      var collator = new Intl.Collator();
      keys.sort(function(a, b) {
        return collator.compare(a, b);
      });
      keys.forEach(key => {
        this.groupedItems.push(groupedData[key]);
      });
      this.groupedItems.length > 0 ? this.curGroup = this.groupedItems[0] : null;
    });
  }
  getConjugatedVerb(url) {
    this.conjugatedVerbService.getConjugatedVerb(url).subscribe(verb => {
      verb.data.content = globals.createGifffer(verb.data.content);
      this.curCategory = verb.data;
      this.title = "Russian language - " + this.curCategory.name;
      this.titleService.setTitle(this.title);
    })
  }

  selectConjugatedGroup(group: any) {
    this.curGroup = group;
  }
  getSubCategory(url): void {
    this.languageSectionService.getSubCategory(url).subscribe(category => {
      category.data.content = globals.createGifffer(category.data.content);
      this.curCategory = category.data;
      if (this.curCategory.url == 'Russian-Conjugated-Verbs' && !this.urlverb) {
        this.getConjugatedVerbs();
      } else {
        this.getConjugatedVerb(this.urlverb);
      }
      this.title = "Russian language - " + this.curCategory.name;
      this.titleService.setTitle(this.title);
    })
  }
  rowClick(type, category) {
    this.leftBarVisible = false;
  }
  ngOnInit() {
    this.title = "Russian language - Russian alphabet";
    this.titleService.setTitle(this.title);
    $('.loader-wrap').show();
    this.getSections();
    this.getComponent();
  }
  play(letter) {
    this.letters.forEach(letter => {
      letter.play = false;
    });
    letter.play = true;
    let audio = new Audio();
    audio.src = '/assets/alphabet/sounds/'+letter.nameAudio;
    audio.load();
    audio.play();
    audio.onended = function() {
      letter.play = false;
    };
  }
  playGif(letter) {
    letter.playGif = true;
  }
  stopGif(letter) {
    letter.playGif = false;
  }
  stop(letter) {
    letter.play = false;
  }
  ngOnDestroy() {
    if (this.navigationSubscription) {
       this.navigationSubscription.unsubscribe();
    }
  }
}
