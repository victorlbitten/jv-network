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

  chart: any;

  links: any;
  nodes: any;
  groups: any;

  selectedNodes: any = new Set();
  defaultColor: string = 'blue';

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

  nodesToRender: any;
  createGraph() {
    this.getData();
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
    this.nodesToRender = filteredNodes.map((node: any) => {
      return {
        id: node.name,
        color: this.colorByGroup[node.group],
        marker: {
          radius: 8
        }
      }
    });

  }

  render() {
    this.filterData();
    this.chart = Highcharts.chart({
      chart: {
        type: 'networkgraph',
        renderTo: 'container'
      },
      tooltip: {
        enabled: false
      },
      series: [{
        type: 'networkgraph',
        data: this.filteredLinks,
        nodes: this.nodesToRender,
        marker: {
          radius: 10,
          states: {
            select: {
              fillColor: 'red',
              radius: 10,
              lineColor: 'blue',
              lineWidth: 3
            }
          },
        },
        events: {
          // click: (event: any) => this.onClick(event)
        },
        dataLabels: {
          allowOverlap: false,
          enabled: true,
          linkFormat: '',
          style: {
            opacity: 1,
            transition: '',
            fontSize: '12px'
          },
        },
        point: {
          events: {
            unselect: (event:any) => {
              event.target.dataLabel.hide();
            },
            select: (event:any) => {
              event.target.dataLabel.show();
            },
            click: (event: any) => this.onClick(event),
            mouseOver: (event: any) => this.turnLabelsOn(event),
            mouseOut: (event: any) => this.turnLabelsOff(event)
          }
        }
      }]
    });

    this.hideLabelsForAllPoints();
  }

  hideLabelsForAllPoints () {
    const points = this.chart.series[0].points;
    points.forEach((point: any) => {
      point.fromNode.dataLabel.hide();
      point.toNode.dataLabel.hide();
    })
  }

  extractPointsFromNode(node: any, includeCurrentNode: boolean = false) {
    const extractedPoints = new Set();
    node.linksTo.forEach((node: any) => extractedPoints.add(node.fromNode));
    node.linksFrom.forEach((node: any) => extractedPoints.add(node.toNode));
    if (includeCurrentNode) {
      extractedPoints.add(node);
    }
    return extractedPoints;
  }

  turnLabelsOn(event: any) {
    const pointsToIterate = this.extractPointsFromNode(event.target, true);
    pointsToIterate.forEach((point: any) => {
      point.dataLabel.show();
    });
  }

  turnLabelsOff(event: any) {
    const pointsToIterate = this.extractPointsFromNode(event.target, true);
    pointsToIterate.forEach((point: any) => {
      if(point.state !== 'select') {
        point.dataLabel.hide();
      }
    });
  }

  onClick(event: any) {
    const clickedPoint: any = event.point;
    const newSelectionState = !clickedPoint.selected;
    const cumulative = event.ctrlKey;

    this.togglePointSelection(clickedPoint, newSelectionState, cumulative);

    if (event.altKey) {
      this.toggleConnectedPointsSelection(clickedPoint);
    }
  }

  togglePointSelection(point: any, newSelectionState: Boolean, cumulative: Boolean) {
    /*
      newSelectionState: true, selects; false, unselects
      cumulative: true, add to selection; false, change selection
    */
    point.select(newSelectionState, cumulative);
  }

  toggleConnectedPointsSelection(clickedPoint: any) {
    const connectedPoints = this.extractPointsFromNode(clickedPoint);
    connectedPoints.forEach((point: any) => {
      point.select(true, true);
    })
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

        event.options.nodes = Object.keys(nodes).map((id: any) => nodes[id]);
      }
    )
  }


  createReference() {
    this.domService.createReference();
  }

  createPopup(event: any) {
    const clickedNode = this.nodes.find((node: any) => node.name === event.point.id);
    const props = {
      title: clickedNode.name,
      fragment: clickedNode.fragment,
      point: clickedNode
    }
    this.domService.appendComponentToBody(FragmentPopupComponent, props);
  }

}
