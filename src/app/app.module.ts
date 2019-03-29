import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxY2PlayerModule } from 'ngx-y2-player';
import { HttpClientModule } from '@angular/common/http';
import { SafeHtmlPipe } from "./_pipes/safehtml";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

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
    AboutComponent,
    TravelComponent
  ],
  imports: [
    BrowserModule,
    NgxY2PlayerModule,
    AppRoutingModule,
    SlickCarouselModule,
    Ng5SliderModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
