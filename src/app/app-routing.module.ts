import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StateListComponent } from './dashboard/state_list/state-list.component';
import {  NewsListComponent } from './news/news-list/news-list.component';
import { PrecautionComponent } from './precaution/precaution.component';
import { LoginComponent } from './login/login.component';
import { NewsViewComponent } from './news/news-view/news-view.component';
import { AuthGuard } from './guards/auth.guard';
import { AddNewsComponent } from './news/add-news/add-news.component';


const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
{path: 'dashboard', component: StateListComponent},
{path: 'news', component: NewsListComponent},
{path: 'precaution', component: PrecautionComponent},
{path: 'login', component: LoginComponent},
{path: 'add-news', component: AddNewsComponent, canActivate: [AuthGuard]},
{path: 'view-news/:id', component: NewsViewComponent},
{path: '**', component: StateListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

export const RoutingComponents = [StateListComponent, NewsListComponent, PrecautionComponent, AddNewsComponent, NewsViewComponent];

