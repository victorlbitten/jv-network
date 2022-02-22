import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-popup',
  templateUrl: './fragment-popup.component.html',
  styleUrls: ['./fragment-popup.component.css']
})
export class FragmentPopupComponent implements OnInit, AfterViewInit {

  scrollPercentage = 0;

  // @Input() title:string = '';
  // @Input() fragment:string = '';
  @Input() point:any;
  @Input() node:any;
  @Input() selfDestroy:any;

  title:string = '';
  expansionByPassageId:any;

  constructor() { }

  ngOnInit(): void {
    this.title = this.node.name;
    this.setExpansionStateByPassageId();
  }

  ngAfterViewInit(): void {
    this.setListeners();
  }

  destroySelf () {
    this.point.select(false, true);
    this.selfDestroy();
  }

  setExpansionStateByPassageId () {
    this.expansionByPassageId = this.node.verbatin.reduce((expansionState:any, passage:any) => {
      expansionState[passage.passageId] = 0;
      return expansionState;
    }, {});
  }

  toggleExpansionStateById (passageId:number) {
    this.expansionByPassageId[passageId] = !this.expansionByPassageId[passageId];
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




    // Scroll
    const bodyElement = document.getElementById(`cardBody-${this.title}`);
    bodyElement?.addEventListener('scroll', (event:any) => {
      const target = event.target;
      let scrollTop = target.scrollTop;
      let clientHeight = target.clientHeight;
      let scrollHeight = target.scrollHeight;
  
      this.scrollPercentage = Math.floor((scrollTop / (scrollHeight - clientHeight)) * 100);
    });
  }


}
