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
    private domService: DomServiceService,
  ) { }

  // Constants used throughout the code
  chart: any;
  colorByGroup: any = {
    "Produção": "#a5460e",
    "Documento": "#a6a6a6",
    "Evento": "#f29f05",
    "Local": "#025939",
    "Se relacionou com José Victor": "#aeccf2",
    "Conheceu José Victor": "#060940",
    "Escutou histórias sobre José Victor": "#65758c",
    "Instituição": "#8c6d12",
    "José Victor": "#8085e9",
  };

  orderedGroups = new Set([
    "Produção",
    "Documento",
    "Evento",
    "Local",
    "Instituição",
    "José Victor",
    "Se relacionou com José Victor",
    "Conheceu José Victor",
    "Escutou histórias sobre José Victor"
  ])

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
  displayFilters:Boolean = false;


  ngOnInit(): void {
    // this.formatNodes();
    // this.filesManipulator.processFiles();
    this.createGraph();
    this.createReference();
  }

  createGraph() {
    this.getData();
    this.render();
  }

  getData() {
    this.allGroups = this.chartDataService.getGroups();
    this.filteredGroups = new Set(this.allGroups);
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
      if (node.name === "José Victor") {
        return {
          id: node.name,
          color: this.colorByGroup[node.group],
          marker: {
            radius: 14
          }
        }
      }
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
        style: {
          fontFamily: "Alternate Gothic N2",
          fontSize: '36px',
          color: `var(--text-color-dark)`
        }
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
        draggable: false,
        layoutAlgorithm: {
          linkLength: 30
        },
        data: this.filteredLinks,
        nodes: this.nodesToRender,
        marker: {
          radius: this.radiusSizes.default,
          states: {
            select: {
              fillColor: '#fff',
              radius: this.radiusSizes.big,
              lineColor: '#411a04',
              lineWidth: 2
            }
          },
        },
        dataLabels: {
          enabled: true,
          linkFormat: '',
          style: {
            opacity: 1,
            transition: '',
            fontSize: '1rem',
            fontFamily: 'PT Serif',
            color: '#444'
          },
        },
        point: {
          events: {
            unselect: (event:any) => {
              if (event.target.id !=="José Victor")  {
                event.target.dataLabel.hide();
              }
              this.closeVerbatin(event.target);
            },
            select: (event:any) => {
              event.target.dataLabel.show();
              this.openVerbatin(event.target);
            },
            click: (event: any) => this.toggleNodeSelection(event),
            mouseOver: (event: any) => this.turnLabelsOn(event),
            mouseOut: (event: any) => this.turnLabelsOff(event)
          }
        }
      }]
    });

    this.hideLabelsForAllPoints();
  }

  hideLabelsForAllPoints () {
    const nodes = this.chart.series[0].nodes;
    nodes.forEach((node: any) => {
      if (node.name !== "José Victor") {
        node.dataLabel.hide();
      }
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

  toggleNodeSelection(event: any) {
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

  toggleFiltersDisplay () {
    this.displayFilters = !this.displayFilters;
  }

  isHelpVisible:Boolean = false;

  toggleHelpVisibility () {
    this.isHelpVisible = !this.isHelpVisible;
  }


  desselectAll () {
    const selectedPoints = this.chart.getSelectedPoints();
    selectedPoints.forEach((point:any) => point.select(false, true))
  }

  // formatNodes () {
  //   const nodes = this.chartDataService.getNodesData();
  //   console.log(nodes);
  //   const longNodes = nodes.filter((node:any) => node.verbatin.some(
  //     (passage:any) => passage.longText !== ""));

    

  //   longNodes.forEach((node:any) => {
  //     node.verbatin.forEach((passage:any, index:number) => {
  //       passage.id=`${node.id}${index+1}`;
        
  //       if(passage.longText !== "") {
  //         const upArrow = `<span id="ua-${passage.id}" class="up-arrow">&uarr;</span>`;
  //         const downArrow = `<span id="da-${passage.id}" class="down-arrow">&darr;</span>`;
  
  //         passage.longText += upArrow;
  //         passage.shortText += downArrow;
  //       }
  //     })
  //   })
  //   console.log(nodes);
  // }


  testing () {

  }


}

