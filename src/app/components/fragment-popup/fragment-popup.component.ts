import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-popup',
  templateUrl: './fragment-popup.component.html',
  styleUrls: ['./fragment-popup.component.css']
})
export class FragmentPopupComponent implements OnInit, AfterViewInit {

  @Input() title:string = '';
  @Input() fragment:string = '';
  @Input() selfDestroy:any;

  constructor() { }

  ngOnInit(): void {
    // this.setListeners();
  }

  ngAfterViewInit(): void {
    this.setListeners();
  }

  destroySelf () {
    this.selfDestroy();
  }

  setListeners () {
    // Drag and drop
    const fragmentContainer = document.getElementById(`cardContainer-${this.title}`);
    fragmentContainer?.addEventListener('dragstart', handleDragStart);
    fragmentContainer?.addEventListener('dragend', handleDragEnd);


    let offsetX:any, offsetY:any;

    function handleDragStart (event:any) {
      const rect = event.target.getBoundingClientRect();

      offsetX = event.clientX - rect.x;
      offsetY = event.clientY - rect.y;
    }

    function handleDragEnd (event:any) { 
      event.stopPropagation();

      let elementStyle: any = fragmentContainer?.style;
      elementStyle.left = event.clientX - offsetX + 'px';
      elementStyle.top = event.clientY - offsetY + 'px';
    }
  }

}
