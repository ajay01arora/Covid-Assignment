import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IState } from '../../interfaces/IState';

@Component({
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.css']
})
export class DistrictListComponent implements OnInit {

  constructor() { }

  @Input()  state : IState = null;

  ngOnChanges(changes: SimpleChanges) 
  {
    console.log(`ngOnChanges - data is ${this.state.stateName}`);

    for (let key in changes) {
      console.log(`${key} changed.
      Current: ${changes[key].currentValue.stateName}.
      Previous: ${changes[key].previousValue?.stateName}`);
    }
  }

  ngOnInit() {
    console.log(`ngOnInit  - data is ${this.state.stateName}`);
  }

  ngOnDestroy() {
    this.state = null;
    console.log("ngOnDestroy");
  }
}
