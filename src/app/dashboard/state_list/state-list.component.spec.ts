import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StateListComponent } from './state-list.component';
import { CasesDataService } from 'src/app/core/services/cases-data.service';
import { IDistrict, IState } from 'src/app/interfaces/IState';
import { Component } from '@angular/core';


const mockData = [{"Andaman and Nicobar Islands": {
  "districtData": {
  "North and Middle Andaman": {
  "notes": "",
  "active": 0,
  "confirmed": 1,
  "deceased": 0,
  "recovered": 1,
  "delta": {
  "confirmed": 0,
  "deceased": 0,
  "recovered": 0
  }
  },
  "South Andaman": {
  "notes": "",
  "active": 16,
  "confirmed": 32,
  "deceased": 0,
  "recovered": 16,
  "delta": {
  "confirmed": 0,
  "deceased": 0,
  "recovered": 1
  }
  }
  },
  "statecode": "AN"
  }}];


describe('StateListComponent', () => {
  let casesService: CasesDataService;
  let httpMock: HttpTestingController;
  let fixture : ComponentFixture<StateListComponent>;
  let stateListComponent: StateListComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StateListComponent],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        StateListComponent,
        CasesDataService
      ]
    });    
    casesService = TestBed.get(CasesDataService);
    fixture =TestBed.createComponent(StateListComponent);
    stateListComponent = fixture.componentInstance;
    
    httpMock = TestBed.get(HttpTestingController);
  });


  it('should confirm selectState through StateCode', (done) => {
    casesService.getStateDetails().subscribe((data) =>
    {             
       for(var state in data[0])
       {
         let districtList = new Array<IDistrict>();
           for (let district in data[0][state].districtData)
           {        
               districtList.push(
                 {
                   districtName :district, 
                   totalCases: data[0][state].districtData[district].confirmed,
                 active: data[0][state].districtData[district].active,
                 recovered: data[0][state].districtData[district].recovered, 
                 deceased : data[0][state].districtData[district].deceased 
               });
           }          
           stateListComponent.StateList.push({stateName:state,stateCode: data[0][state].statecode,districtList: districtList});
       }
       stateListComponent.viewStateDetails('AN');
       expect(stateListComponent.selectState.stateName).toContain("Andaman and Nicobar Islands");
       done();

     });
      let newsRequest = httpMock.expectOne('https://api.covid19india.org/state_district_wise.json');
      newsRequest.flush(mockData);
      httpMock.verify();
  });

  it('should confirm the stateList length', (done) => {
    
    casesService.getStateDetails().subscribe((data) =>
    {             
       for(var state in data[0])
       {
         let districtList = new Array<IDistrict>();
           for (let district in data[0][state].districtData)
           {        
               districtList.push(
                 {
                   districtName :district, 
                   totalCases: data[0][state].districtData[district].confirmed,
                 active: data[0][state].districtData[district].active,
                 recovered: data[0][state].districtData[district].recovered, 
                 deceased : data[0][state].districtData[district].deceased 
               });
           }          
           stateListComponent.StateList.push({stateName:state,stateCode: data[0][state].statecode,districtList: districtList});
       }
       expect(stateListComponent.StateList.length).toBe(1);
       done();

     });
      let newsRequest = httpMock.expectOne('https://api.covid19india.org/state_district_wise.json');
      newsRequest.flush(mockData);
      httpMock.verify();
  });

});


