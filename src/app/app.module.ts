import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChartComponent } from './components/chart/chart.component';
import { NetworkgraphComponent } from './components/networkgraph/networkgraph.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    NetworkgraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
