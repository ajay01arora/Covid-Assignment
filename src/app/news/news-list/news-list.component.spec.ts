import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsDataService } from 'src/app/core/services/news-data.service';
import { NewsListComponent } from './news-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';



const mockData = [{ id:1, newsTitle:"Hello newstitle", description:"description", image_link:"image_link", full_news:"full_news"},
{id:2, newsTitle:"Hello newstitle2", description:"description2", image_link:"image_link2", full_news:"full_news2"}
];

describe('NewsDataService', () => {
  let newsDataService: NewsDataService;
  let httpMock: HttpTestingController;
  let fixture : ComponentFixture<NewsListComponent>;
  let newsListComponent: NewsListComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientTestingModule],
      declarations: [ NewsListComponent ]      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    newsListComponent = fixture.componentInstance; 
    
    newsDataService = TestBed.inject(NewsDataService);  
    httpMock = TestBed.get(HttpTestingController);
    
    

  });

  it('should have same news id', (done) => {
          newsDataService.getNews().then(data => {
    newsListComponent.NewsList = data;
      expect(newsListComponent.NewsList[0].id).toEqual(1);                         
      done();
    });

    let newsRequest = httpMock.expectOne('https://jsonstorage.net/api/items/22cab926-1f6a-46a5-9603-5dc37b5119ec');
    newsRequest.flush(mockData);

    httpMock.verify();
  });

  it('should have same newsTitle', (done) => {
    newsDataService.getNews().then(data => {
    newsListComponent.NewsList = data;
    expect(newsListComponent.NewsList[0].newsTitle).toEqual('Hello newstitle');                         
    done();
    });

    let newsRequest = httpMock.expectOne('https://jsonstorage.net/api/items/22cab926-1f6a-46a5-9603-5dc37b5119ec');
    newsRequest.flush(mockData);

    httpMock.verify();
});

});
