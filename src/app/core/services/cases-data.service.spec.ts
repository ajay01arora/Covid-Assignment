import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CasesDataService } from './cases-data.service';


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

describe('CasesDataService', () => {
  let casesDataService: CasesDataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CasesDataService
      ]
    });

    casesDataService = TestBed.get(CasesDataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should successfully get cases data', (done) => {
    casesDataService.getStateDetails().subscribe(data => {
      expect(data).toEqual(mockData);
      expect((data as any).length).toEqual(mockData.length);                    
      done();
    });

    let newsRequest = httpMock.expectOne('https://api.covid19india.org/state_district_wise.json');
    newsRequest.flush([{"Andaman and Nicobar Islands": {
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
      }}]);

    httpMock.verify();
  });

});
