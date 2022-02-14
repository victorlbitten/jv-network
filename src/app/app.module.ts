import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NetworkgraphComponent } from './components/networkgraph/networkgraph.component';
import { FragmentPopupComponent } from './components/fragment-popup/fragment-popup.component';
import { ImageCarouselComponent } from './components/image-carousel/image-carousel.component';
import { VerbatinContainerComponent } from './components/verbatin-container/verbatin-container.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    NetworkgraphComponent,
    FragmentPopupComponent,
    ImageCarouselComponent,
    VerbatinContainerComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
