import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule , RoutingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { DistrictListComponent } from './dashboard/district-list/district-list.component';
import { LoginComponent } from './login/login.component';

import { AuthGuard} from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    DistrictListComponent,
    LoginComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    ReactiveFormsModule,
    CoreModule
  ],
  
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
