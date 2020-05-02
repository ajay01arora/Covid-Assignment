import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CasesDataService } from '../../core/services/cases-data.service';
import { IDistrict, IState } from '../../interfaces/IState';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.css'],
  providers: [CasesDataService]
})
export class StateListComponent implements OnInit {

  constructor(private cases_data : CasesDataService) { }

  StateList : IState[]=[];
  
  selectState : IState;

  dataServiceSubscribe : Subscription;

  viewStateDetails(stateCode : string)
  {
    this.selectState = this.StateList.find(s=> s.stateCode === stateCode)
  }


ngOnInit() {
  this.dataServiceSubscribe = this.cases_data.getStateDetails().subscribe((data) =>{ 

     console.log("data===",data);

      for(var state in data)
      {
        let districtList = new Array<IDistrict>();
          for (let district in data[state].districtData)
          {        
              districtList.push(
                {
                  districtName :district, 
                  totalCases: data[state].districtData[district].confirmed,
                active: data[state].districtData[district].active,
                recovered: data[state].districtData[district].recovered, 
                deceased : data[state].districtData[district].deceased 
              });
          }          
          this.StateList.push({stateName:state,stateCode: data[state].statecode,districtList: districtList});
      }
      console.log("stateList====",this.StateList)
    });
  }

  ngOnDestroy() {
    this.dataServiceSubscribe.unsubscribe();
    this.StateList = null;
    this.selectState = null;
    console.log("State list component destroyed.");
  }
  

}
