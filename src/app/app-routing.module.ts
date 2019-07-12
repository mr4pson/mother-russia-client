import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WatchComponent } from './watch/watch.component';
import { ListenComponent } from './listen/listen.component';
import { WatchDetailComponent } from './watch-detail/watch-detail.component';
import { ListenDetailComponent } from './listen-detail/listen-detail.component';
import { ReadComponent } from './read/read.component';
import { ReadDetailComponent } from './read-detail/read-detail.component';
import { LearnComponent } from './learn/learn.component';
import { RussianLanguageComponent } from './russian-language/russian-language.component';
import { AboutComponent } from './about/about.component';
import { TravelComponent } from './travel/travel.component';
import { ArticleComponent } from './article/article.component';
import { CultureComponent } from './culture/culture.component';
import { KitchenComponent } from './kitchen/kitchen.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'watch/:url', component: WatchDetailComponent },
  { path: 'listen', component: ListenComponent },
  { path: 'listen/:url', component: ListenDetailComponent },
  { path: 'read', component: ReadComponent },
  { path: 'read/:url', component: ReadDetailComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'Russian-language', component: RussianLanguageComponent },
  { path: 'Russian-language/:categoryType/:url', component: RussianLanguageComponent },
  { path: 'Russian-language/:categoryType/:url/:urlverb', component: RussianLanguageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:url', component: AboutComponent },
  { path: 'travel', component: TravelComponent },
  { path: ':section/:url', component: ArticleComponent },
  { path: 'culture', component: CultureComponent },
  { path: 'kitchen', component: KitchenComponent },
/*  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },*/
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
})
export class AppRoutingModule {}
