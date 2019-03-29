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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'watch/:id', component: WatchDetailComponent },
  { path: 'listen', component: ListenComponent },
  { path: 'listen/:id', component: ListenDetailComponent },
  { path: 'read', component: ReadComponent },
  { path: 'read/:id', component: ReadDetailComponent },
  { path: 'learn', component: LearnComponent },
  { path: 'Russian_language', component: RussianLanguageComponent },
  { path: 'Russian_language/:categoryType/:url', component: RussianLanguageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'about/:url', component: AboutComponent },
  { path: 'travel', component: TravelComponent },
/*  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heroes', component: HeroesComponent },*/
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}) ],
})
export class AppRoutingModule {}
