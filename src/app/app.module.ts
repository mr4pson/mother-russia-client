import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxY2PlayerModule } from 'ngx-y2-player';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from "./_pipes/safehtml";
import { StripHtmlPipe } from "./_pipes/striphtml.pipe";
import { ReactiveFormsModule }    from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { DxScrollViewModule  } from "devextreme-angular";


import { SlickCarouselModule } from 'ngx-slick-carousel';
import { WatchComponent } from './watch/watch.component';
import { WatchSliderComponent } from './watch-slider/watch-slider.component';
import { WatchDetailComponent } from './watch-detail/watch-detail.component';
import { ListenComponent } from './listen/listen.component';
import { ListenDetailComponent } from './listen-detail/listen-detail.component';
import { SongTextComponent } from './song-text/song-text.component';
import { ReadComponent } from './read/read.component';
import { ReadDetailComponent } from './read-detail/read-detail.component';
import { LearnComponent } from './learn/learn.component';
import { RussianLanguageComponent } from './russian-language/russian-language.component';
import { AboutComponent } from './about/about.component';
import { TravelComponent } from './travel/travel.component';
import { ArticleComponent } from './article/article.component';
import { CultureComponent } from './culture/culture.component';
import { KitchenComponent } from './kitchen/kitchen.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';
import { SocialBarComponent } from './social-bar/social-bar.component';
import { SubscribePopupComponent } from './subscribe-popup/subscribe-popup.component';

import { ImageService } from './_services/image.service';
import { AdblockComponent } from './adblock/adblock.component';
import { BlockerInstructionsComponent } from './blocker-instructions/blocker-instructions.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    WatchComponent,
    WatchSliderComponent,
    WatchDetailComponent,
    ListenComponent,
    ListenDetailComponent,
    SongTextComponent,
    ReadComponent,
    ReadDetailComponent,
    LearnComponent,
    RussianLanguageComponent,
    SafeHtmlPipe,
    StripHtmlPipe,
    AboutComponent,
    TravelComponent,
    ArticleComponent,
    CultureComponent,
    KitchenComponent,
    ScrollToTopComponent,
    SocialBarComponent,
    SubscribePopupComponent,
    AdblockComponent,
    BlockerInstructionsComponent
  ],
  imports: [
    BrowserModule,
    NgxY2PlayerModule,
    AppRoutingModule,
    SlickCarouselModule,
    Ng5SliderModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    DxScrollViewModule 
  ],
  providers: [
    ImageService,
    StripHtmlPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
