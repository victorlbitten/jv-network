import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import networkgraph from 'highcharts/modules/networkgraph';

import { DomServiceService } from 'src/app/services/dom-service.service';

import { FragmentPopupComponent } from '../fragment-popup/fragment-popup.component';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');
require('highcharts/modules/networkgraph')(Highcharts);

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);
networkgraph(Highcharts);

import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'networkgraph',
  templateUrl: './networkgraph.component.html',
  styleUrls: ['./networkgraph.component.css']
})
export class NetworkgraphComponent implements OnInit {
  constructor(
    private chartDataService: ChartDataService,
    private domService: DomServiceService
  ) { }

  options = {
    credits: {
      enabled: false
    },
    chart: {
      type: 'networkgraph'
    },
    title: {
      text: 'Testing with Highcharts'
    },
    plotOptions: {
      networkgraph: {
        keys: ['from', 'to'],
        layoutAlgorithm: {
          enableSimulation: true,
          friction: -0.9
        }
      }
    },
    series: {
      type: 'networkgraph'
    }
  }

  chart: any;

  links: any;
  nodes: any;
  groups: any;

  filteredLinks: any;
  filteredGroups: any;
  colorByGroup: any = {
    "Ator": "#7cb5ec",
    "Produção": "#434348",
    "Local": "#90ed7d",
    "Evento": "#f7a35c",
    "Documento": "#8085e9"
  };

  ngOnInit(): void {
    this.createGraph();
    this.createReference();
  }

  createGraph() {
    this.getData();
    this.addEvent();
    this.render();
  }

  getData() {
    this.groups = this.chartDataService.getGroups();
    this.filteredGroups = new Set(this.groups);
    this.nodes = this.chartDataService.getNodesData();
    this.links = this.chartDataService.getLinksData();
  }

  filterData() {
    const filteredNodes = this.nodes.filter((node: any) => this.filteredGroups.has(node.group));
    const filteredNodesName = filteredNodes.map((node: any) => node.name);

    this.filteredLinks = this.links.filter((link: any) => filteredNodesName.includes(link.from) || filteredNodesName.includes(link.to));
  }

  render() {
    this.filterData();
    this.chart = Highcharts.chart({
      chart: {
        type: 'networkgraph',
        renderTo: 'container'
      },

      series: [{
        type: 'networkgraph',
        data: this.filteredLinks,
        marker: {
          radius: 10
        },
        events: {
          click: (event: any) => this.createPopup(event)
        },
        dataLabels: {
          enabled: true,
          linkFormat: ''
        }
      }]
    });
    console.log(this.chart);
  }

  toggleGroup(group: any) {
    const setSize = this.filteredGroups.size;
    if (setSize === 5) {
      this.filteredGroups.clear();
      this.filteredGroups.add(group);
    }

    const groupAlreadySelected = this.filteredGroups.has(group);
    if (setSize > 0 && setSize < 5) {
      if (groupAlreadySelected) {
        this.filteredGroups.delete(group);
      } else {
        this.filteredGroups.add(group);
      }
    }

    if (this.filteredGroups.size === 0) {
      this.filteredGroups = new Set(this.groups);
    }

    this.render();
  }



  addEvent() {
    Highcharts.addEvent(
      Highcharts.Series,
      'afterSetOptions',
      (event: Highcharts.Dictionary<any>) => {
        const colors: any = Highcharts.getOptions().colors, i = 0, nodes: any = {};

        event.options.data.forEach((link: any) => {
          const a = this.nodes.find((node: any) => node.name === link.from);
          const b = this.nodes.find((node: any) => node.name === link.to);
          nodes[link.from] = {
            id: link.from,
            color: this.colorByGroup[a.group],
            marker: {
              radius: (this.filteredGroups.has(a.group)) ? 10 : 5
            }
          };
          nodes[link.to] = {
            id: link.to,
            color: this.colorByGroup[b.group],
            marker: {
              radius: (this.filteredGroups.has(b.group)) ? 10 : 5,
            }
          }
        })

        event.options.nodes = Object.keys(nodes).map((id: any) => nodes[id])

      }
    )
  }


  createReference () {
    this.domService.createReference();
  }

  createPopup (event:any) {
    const clickedNode = this.nodes.find((node:any) => node.name === event.point.id);
    console.log(clickedNode);
    const props = {
      title: clickedNode.name,
      fragment: clickedNode.fragment
    }
    this.domService.appendComponentToBody(FragmentPopupComponent, props);
  }

}
