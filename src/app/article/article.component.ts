import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Article } from '../_models/article';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ArticleService } from '../_services/article.service';
import { HostListener } from '@angular/core';
import { globals } from '../globals';
import { ImageService } from './../_services/image.service';
import { Title, Meta } from "@angular/platform-browser";
import { StripHtmlPipe } from './../_pipes/striphtml.pipe';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  article: Article;
  section: string;
  innerWidth: number = 0;
  title: string;
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = this.window.innerWidth;
  }
  constructor(@Inject(WINDOW) private window: Window, 
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticleService,
    private titleService:Title,
    private imageService: ImageService,
    private stripPipe: StripHtmlPipe,
    private meta: Meta
  ) {
    this.innerWidth = window.screen.width;
  }
  getBckgndImageUrl(imageUrl) {
    return this.imageService.getBckgndImageUrl(imageUrl);
  }
  ngOnInit() {
    let url = this.route.snapshot.paramMap.get('url');
    this.section = this.route.snapshot.paramMap.get('section');
    this.articleService.getArticle(url).subscribe(
      article => {
        article.data.content = globals.clearEditable(article.data.content);
        article.data.content = globals.createGifffer(article.data.content);
        this.article = article.data;
        this.title = this.stripPipe.transform(this.article.metaTitle);
        this.titleService.setTitle(this.title);
        this.meta.updateTag({name: 'description', content: this.article.metaDescription});
      }
    );
  }

}
