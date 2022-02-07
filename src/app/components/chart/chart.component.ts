import { AfterContentInit, Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { ChartDataService } from 'src/app/services/chart-data.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements AfterContentInit {

  constructor(
      private chartDataService: ChartDataService
  ) { }


height:any;
width:any;

linkStrength = 0.001;
nodeRadius = 4;
svg:any;

simulation: any;
nodeElements: any;
linkElements: any;
textElements: any;

nodes: any;
links: any;

  ngAfterContentInit(): void {
		this.fetchData();
    this.initSvg();
    this.createSimulation();
    this.createNetworkElements();
    this.setNetworkTicks();

    this.simulation.force('link').links(this.links);
  }

	fetchData () {
		this.nodes = this.chartDataService.getNodesData();
		this.links = this.chartDataService.getLinksData();
	}

  initSvg () {
    this.height = window.innerHeight;
    this.width = window.innerWidth;
    this.svg = d3
      .select('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  createSimulation () {
    this.simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(-35))
      .force('center', d3.forceCenter(this.width / 2, this.height / 2))
      .force('link', d3.forceLink()
          .id((link: any) => {
            return link.name;
            })
          .strength(link => 0.01));
  }

  createNetworkElements () {
    this.nodeElements = this.svg.append('g')
    .selectAll('circle')
    .data(this.nodes)
    .enter().append('circle')
        .attr('r', this.nodeRadius)
        .attr('fill', '#aaa')
        .on("click", (node:any) => this.onNodeClick(node));

    this.linkElements = this.svg.append('g')
    .selectAll('line')
    .data(this.links)
    .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', '#aaf');

    this.textElements = this.svg.append('g')
    .selectAll('text')
    .data(this.nodes)
    .enter().append('text')
        .text((node:any) => node.name)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);
  }

  onNodeClick (node: any) {
    console.log(node);
  }

  setNetworkTicks () {
      console.log(this.simulation);
    this.simulation.nodes(this.nodes).on('tick', () => {
      this.nodeElements
        .attr('cx', (node: any) => node.x)
        .attr('cy', (node: any) => node.y);
  
      this.textElements
          .attr('x', (node: any) => node.x)
          .attr('y', (node: any) => node.y);
  
      this.linkElements
          .attr('x1', (link: any) => link.source.x)
          .attr('y1', (link: any) => link.source.y)
          .attr('x2', (link: any) => link.target.x)
          .attr('y2', (link: any) => link.target.y)
    })
  }

}
