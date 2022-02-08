import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-fragment-popup',
  templateUrl: './fragment-popup.component.html',
  styleUrls: ['./fragment-popup.component.css']
})
export class FragmentPopupComponent implements OnInit {

  @Input() title:string = '';
  @Input() fragment:string = '';
  @Input() selfDestroy:any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.title);
    console.log(this.fragment)
  }

  destroySelf () {
    this.selfDestroy();
  }

}
