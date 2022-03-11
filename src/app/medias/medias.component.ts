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
  enlargedMediaLink:string = "";

  ngOnInit(): void {
    console.log(this.medias);
  }

  toggleExpansion () {
    this.expanded = !this.expanded;
  }

  enlargeImage (link:string) {
      this.enlargedMediaLink = link;
  }

}
