import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup,FormBuilder, Validators} from '@angular/forms';
import { INews } from '../../interfaces/INews';
import { NewsDataService } from '../../core/services/news-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  constructor(
          public fb : FormBuilder,
          private newsdata : NewsDataService, 
          private router : Router
     ) { }

  newsForm : FormGroup;
  saveButton : string = "Save";
  news : INews;
  submitted:Boolean=false;

  ngOnInit(): void {
    this.newsForm = this.fb.group({
      newsTitle : ["", [Validators.required, Validators.minLength(50)]],
      description : ["", [Validators.required, Validators.minLength(500)]],
      image_link : ["", [Validators.required]],
      full_news : ["", [Validators.required, Validators.minLength(3000)]]
    });

  }

  get f() {
    return this.newsForm.controls;
  } 
  
async save() 
  {
    this.saveButton = "Saving";
    this.submitted=true;
    // console.log("news=====",News)
    if (this.newsForm.invalid) {
      return;
     }

    if (this.newsForm.valid)
    {
      const data=await this.newsdata.addNews(this.newsForm.value)
        if(data){
          setTimeout(() => {            
            this.router.navigate(['/news'])
          }, 1500);
     }

      console.log("add_news=====data====",data)
    }
  }

  ngOnDestroy() {
    this.newsForm =null
    this.news = null;
    console.log("add news component destroyed.");
  }


}
