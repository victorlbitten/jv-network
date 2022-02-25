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

  // Constants used throughout the code
  chart: any;
  colorByGroup: any = {
    "José Victor": "#8085e9",
    "Produção": "#f7a35c",
    "Local": "90ed7d",
    "Evento": "#434348",
    "Se relacionou com José Victor": "#7cb5ec",
    "Escutou histórias sobre José Victor": "#DDAAFF",
    "Conheceu José Victor": "#11F4F4",
    "Documento": "#FF4A4A",
    "Instituição": "#70F186"
  };

  test:any = {
    "José Victor": "#8085e9",
    "Produção": "#f7a35c",
    "Local": "90ed7d",
    "Evento": "#434348",
    "Se relacionou com José Victor": "#7cb5ec",
    "Escutou histórias sobre José Victor": "#DDAAFF",
    "Conheceu José Victor": "#11F4F4",
    "Documento": "#FF4A4A",
    "Instituição": "#70F186"
  }
  radiusSizes: any = {
    default: 7,
    big: 9,
    small: 6
  };
  verbatinReferenceByPointId:any = {};

  csvReader:any = new FileReader ();

  // Comes from 'backend'. Never changes
  allLinks: any;
  allNodes: any;
  allGroups: any;
  
  // Data that get actually rendered; changes whenever user interacts with the interface
  filteredLinks: any;
  filteredGroups: any;
  nodesToRender: any;


  ngOnInit(): void {
    this.createGraph();
    this.createReference();
  }

  createGraph() {
    this.getData();
    this.render();
  }

  getData() {
    this.allGroups = this.chartDataService.getGroups();
    console.log(this.allGroups);
    this.filteredGroups = new Set(this.allGroups);
    console.log(this.filteredGroups);
    this.allNodes = this.chartDataService.getNodesData();
    this.allLinks = this.chartDataService.getLinksData();
  }

  filterData() {
    const directlyFilteredNodes = this.allNodes.filter((node: any) => this.filteredGroups.has(node.group));
    const directlyFilteredNodesName = directlyFilteredNodes.map((node: any) => node.name);
    this.filteredLinks = this.allLinks.filter((link: any) => 
      directlyFilteredNodesName.includes(link.from) || directlyFilteredNodesName.includes(link.to)
    );

    const relatedNodeNames = new Set();
    this.filteredLinks.forEach((link:any) => {
      relatedNodeNames.add(link.to);
      relatedNodeNames.add(link.from);
    })

    const allFilteredNodes = this.allNodes.filter((node:any) => relatedNodeNames.has(node.name));

    this.nodesToRender = allFilteredNodes.map((node: any) => {
      return {
        id: node.name,
        color: this.colorByGroup[node.group],
        marker: {
          radius: (this.filteredGroups.has(node.group))
            ? this.radiusSizes.big
            : this.radiusSizes.small
        }
      }
    });

  }

  render() {
    this.filterData();
    this.chart = Highcharts.chart({
      title: {
        text: 'O que permanece sobre José Victor?',
      },
      credits: {
        enabled: false
      },
      chart: {
        type: 'networkgraph',
        renderTo: 'container',
      },
      tooltip: {
        enabled: false
      },
      series: [{
        type: 'networkgraph',
        data: this.filteredLinks,
        nodes: this.nodesToRender,
        marker: {
          radius: this.radiusSizes.default,
          states: {
            select: {
              fillColor: 'red',
              radius: this.radiusSizes.big,
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
              this.closeVerbatin(event.target);
            },
            select: (event:any) => {
              event.target.dataLabel.show();
              this.openVerbatin(event.target);
            },
            click: (event: any) => this.onClick(event),
            mouseOver: (event: any) => this.turnLabelsOn(event),
            mouseOut: (event: any) => this.turnLabelsOff(event)
          }
        }
      }]
    });

    this.hideLabelsForAllPoints();
    console.log(this.chart);
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
    if (setSize === 9) {
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
      this.filteredGroups = new Set(this.allGroups);
    }

    this.render();
  }






  // FUNCTIONS USED TO CREATE THE nci
  createReference() {
    // this.domService.createReference();
  }

  openVerbatin(point:any) {
    this.createPopup(point);
  }

  closeVerbatin(point:any) {
    this.verbatinReferenceByPointId[point.id].selfDestroy();
  }

  getNodeByPointId (pointId:string) {
    return this.allNodes.find((node: any) => node.name === pointId);
  }

  createPopup(point: any) {
    const clickedNode = this.allNodes.find((node: any) => node.name === point.id);
    const props = {
      point,
      allPoints: this.chart.series[0].nodes,
      node: this.getNodeByPointId(point.id)
    };
    this.verbatinReferenceByPointId[point.id] = this.domService.appendComponentToBody(FragmentPopupComponent, props);
  }

}
