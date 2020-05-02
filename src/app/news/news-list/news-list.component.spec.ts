import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NewsDataService } from '../../core/services/news-data.service';
import { DebugElement } from '@angular/core';
import { By } from "@angular/platform-browser";

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;
  let authService: NewsDataService;
  let el: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

        // refine the test module by declaring the test component
        TestBed.configureTestingModule({
          declarations: [NewsListComponent],
          providers: [NewsDataService, HttpClientTestingModule,RouterTestingModule]
      });

      // create component and test fixture
      fixture = TestBed.createComponent(NewsListComponent);

      // get test component from the fixture
      component = fixture.componentInstance;

      // UserService provided to the TestBed
      authService = TestBed.get(NewsDataService);


  });



});
