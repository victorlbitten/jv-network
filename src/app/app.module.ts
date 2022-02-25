import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NetworkgraphComponent } from './components/networkgraph/networkgraph.component';
import { FragmentPopupComponent } from './components/fragment-popup/fragment-popup.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { VerbatinContainerComponent } from './components/verbatin-container/verbatin-container.component';
import { HomeComponent } from './home/home.component';


const routes:Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'networkgraph', component: NetworkgraphComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    NetworkgraphComponent,
    FragmentPopupComponent,
    ImageCarouselComponent,
    VerbatinContainerComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
