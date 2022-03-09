import { Injectable } from '@angular/core';
// import { nodes } from '../staticData/nodes';
import { nodes } from '../staticData/nodesTest';
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

  getGroups () {
    let groups = new Set();
    nodes.forEach((node) => {
      groups.add(node.group);
    });

    return groups;
  }
}
