import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { INews } from '../../interfaces/INews';
import { NewsDataService } from '../../core/services/news-data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css'],
  providers: [NewsDataService]
})
export class NewsListComponent implements OnInit {

  constructor(private newsData : NewsDataService, private router :Router) { }

  NewsList : INews[]=[];

  async ngOnInit() 
  {
    const data=await  this.newsData.getNews();   
    this.NewsList = data;   
  }

  ngOnDestroy()
  {
    this.NewsList =null;
    console.log("News-List component destroyed");
  }

  ViewNews(id: number)
  {
    let routeUrl = "view-news/"+id;
    this.router.navigate([routeUrl]);
  }
  
}
