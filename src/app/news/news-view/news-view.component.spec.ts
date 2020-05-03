import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsViewComponent } from './news-view.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsDataService } from 'src/app/core/services/news-data.service';

const mockData = [{ id:1, newsTitle:"Hello newstitle", description:"description", image_link:"image_link", full_news:"full_news"},
{id:2, newsTitle:"Hello newstitle2", description:"description2", image_link:"image_link2", full_news:"full_news2"}
];

describe('NewsViewComponent', () => {
  let component: NewsViewComponent;
  let fixture: ComponentFixture<NewsViewComponent>;
  let newsDataService : NewsDataService;
  let httpMock: HttpTestingController;

  const fakeActivatedRoute = 
  {
    "snapshot": {
      "data": {
        "params": {
          "id": 1
        }
      }
    }
  } as unknown as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ NewsViewComponent ],
      providers: [ {provide: ActivatedRoute, useValue: { snapshot: {params: {id :{get() : number { return 1; }}}}}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsViewComponent);
    component = fixture.componentInstance;
    newsDataService = TestBed.inject(NewsDataService);  
    httpMock = TestBed.get(HttpTestingController);    
  });

  it('should have same newsTitle in the newsView Component through getNewsById', (done) => {
    newsDataService.getNewsById(1).then(data => {
    component.News = data;
    expect(component.News.newsTitle).toEqual('Hello newstitle');                         
    done();
    });

    let newsRequest = httpMock.expectOne('https://jsonstorage.net/api/items/22cab926-1f6a-46a5-9603-5dc37b5119ec');
    newsRequest.flush(mockData);

    httpMock.verify();
  });

  it('should have same id in the newsView Component through getNewsById', (done) => {
    newsDataService.getNewsById(1).then(data => {
    component.News = data;
    expect(component.News.id).toEqual(1);                         
    done();
    });

    let newsRequest = httpMock.expectOne('https://jsonstorage.net/api/items/22cab926-1f6a-46a5-9603-5dc37b5119ec');
    newsRequest.flush(mockData);

    httpMock.verify();
  });

});
