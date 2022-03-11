import { AfterContentInit, AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
  @Input() allPoints:any;
  @Input() node:any;
  @Input() selfDestroy:any;

  title:string = '';
  expansionByPassageId:any;
  expansiblePassageIds:any = [];
  passages:any = [];

  showMediasComponent:boolean | undefined;


  constructor(private sanitizer:DomSanitizer) { }

  ngOnInit(): void {
    this.showMediasComponent = Boolean(this.node.medias.verbatin.length || this.node.medias.expansion.length);

    this.title = this.node.name;
    this.setExpansionStateByPassageId();
    this.node.verbatin.forEach((passage:any, index:number) => {
      let trustedPassageHTML = {
        id: `${passage.id}`,
        shortText: this.sanitizer.bypassSecurityTrustHtml(passage.shortText),
        longText: this.sanitizer.bypassSecurityTrustHtml(passage.longText)
      };
      this.passages.push(trustedPassageHTML);

      if (passage.longText !== "") {
        this.expansiblePassageIds.push(trustedPassageHTML.id);
      }
    })
  }

  ngAfterViewInit(): void {
    this.setListeners();

   this.renderLinks();
   this.insertExpansion();
  }

  destroySelf () {
    this.point.select(false, true);
    this.selfDestroy();
  }

  setExpansionStateByPassageId () {
    this.expansionByPassageId = this.node.verbatin.reduce((expansionState:any, passage:any) => {
      expansionState[passage.id] = 0;
      return expansionState;
    }, {});
  }

  toggleExpansionStateById (passageId:number) {
    console.log(passageId);
    this.expansionByPassageId[passageId] = !this.expansionByPassageId[passageId];
    console.log(this.expansionByPassageId);
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

  openNode (nodeId:string) {
    const desiredPoint = this.allPoints.find((point:any) => point.id === nodeId);
    if (desiredPoint.state !== "select") {
      desiredPoint.select(true, true);
    }
  }

  renderLinks () {
    const linkElements = document.querySelectorAll('a');
    const downArrowElements = Array.from(document.getElementsByClassName('mdi-arrow-down-bold-box'));
    const upArrowElements = Array.from(document.getElementsByClassName('mdi-arrow-up-bold-box'));
    const passageElements = Array.from(document.getElementsByClassName('node-text'));
    passageElements.forEach((passage:any) => {
      passage.style.fontSize = "1.1rem";
      passage.style.lineHeight = "1.3rem";
    })

    linkElements.forEach((link:any) => {
      link.style.fontFamily = "Alternate Gothic N2";
      link.style.fontSize = "18px";
      link.style.color = "#fff";
      link.style.textDecoration = "underline";
      link.style.cursor = "pointer";

      link.addEventListener("click", (event:any) => {
        this.openNode(event.target.innerHTML);
      })
    });

    downArrowElements.forEach((da:any) => {
      da.style.fontSize = "20px";
      da.style.cursor = 'pointer';
      da.style.fontWeight = 600;
      da.style.color = "#fff";
      da.addEventListener("click", (event:any) => {
        this.toggleExpansionStateById(da.id);
      })
    })

    upArrowElements.forEach((ua:any) => {
      ua.style.fontSize = "20px";
      ua.style.cursor = 'pointer';
      ua.style.fontWeight = 600;
      ua.style.color = "#fff";
      ua.addEventListener("click", (event:any) => {
        this.toggleExpansionStateById(ua.id);
      })
    })

  }

  insertExpansion () {

  }


}
