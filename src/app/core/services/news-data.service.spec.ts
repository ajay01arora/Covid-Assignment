import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsDataService } from './news-data.service';
import { INews } from 'src/app/interfaces/INews';

const mockData = [{ id:1, newsTitle:"Hello newstitle", description:"description", image_link:"image_link", full_news:"full_news"},
{id:2, newsTitle:"Hello newstitle2", description:"description2", image_link:"image_link2", full_news:"full_news2"}
];

describe('NewsDataService', () => {
  let newsDataService: NewsDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        NewsDataService
      ]
    });

    newsDataService = TestBed.get(NewsDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should successfully get news data', (done) => {
    newsDataService.getNews().then(data => {
      expect(data).toEqual(mockData);
      expect(data.length).toEqual(mockData.length);                    
      done();
    });

    let newsRequest = httpMock.expectOne('https://jsonstorage.net/api/items/22cab926-1f6a-46a5-9603-5dc37b5119ec');
    newsRequest.flush([{id:1, newsTitle:"Hello newstitle", description:"description", image_link:"image_link", full_news:"full_news"},
                          {id:2, newsTitle:"Hello newstitle2", description:"description2", image_link:"image_link2", full_news:"full_news2"}
                        ]);

    httpMock.verify();
  });

});
