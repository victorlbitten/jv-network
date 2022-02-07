import { Injectable } from '@angular/core';
import { nodes } from '../staticData/nodes';
import { links } from '../staticData/links';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor() { }

  getNodesData () {
    return nodes;
  }

  getLinksData () {
    return links;
  }
}
