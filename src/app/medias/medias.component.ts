import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-medias',
  templateUrl: './medias.component.html',
  styleUrls: ['./medias.component.css']
})
export class MediasComponent implements OnInit {
  @Input() medias:any;

  constructor() { }

  expanded = false;

  ngOnInit(): void {
    console.log(this.medias);
  }

  toggleExpansion () {
    this.expanded = !this.expanded;
  }

}
