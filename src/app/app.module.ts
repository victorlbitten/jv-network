import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NetworkgraphComponent } from './components/networkgraph/networkgraph.component';
import { FragmentPopupComponent } from './components/fragment-popup/fragment-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    NetworkgraphComponent,
    FragmentPopupComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
