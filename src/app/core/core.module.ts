import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasesDataService } from './services/cases-data.service';
import { AuthService } from './services/auth.service';
import { NewsDataService } from './services/news-data.service';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [],
  exports:[],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers:
  [
    CasesDataService, AuthService, NewsDataService
  ]
})
export class CoreModule { }
