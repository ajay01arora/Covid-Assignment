import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { StateListComponent } from './state-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CasesDataService } from '../../core/services/cases-data.service';
import { Observable } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StateListComponent', () => {
  let component: StateListComponent;
  let fixture: ComponentFixture<StateListComponent>;
  let cases = CasesDataService;
  let el: DebugElement;

  class MockCasesDataService
  {
    selectState = {stateName: 'Andaman & Nicobar', stateCode : 'AN'};
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      declarations: [ StateListComponent ],
      providers:[{provide: CasesDataService, useClass: MockCasesDataService}]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(StateListComponent);
      component = fixture.componentInstance;
      cases = TestBed.get(CasesDataService); 
      //  get the "a" element by CSS selector (e.g., by class name)
      el = fixture.debugElement.query(By.css('stateName'));

    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
