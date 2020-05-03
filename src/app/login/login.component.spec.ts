import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from '../core/services/auth.service';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let formBuilder : FormBuilder;
  

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule,BrowserModule,FormsModule, ReactiveFormsModule],
      declarations: [ LoginComponent ],
      providers: [FormBuilder,AuthService]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      de=fixture.debugElement.query(By.css('form'));
      el = de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    httpMock = TestBed.get(HttpTestingController);
    formBuilder = TestBed.get(FormBuilder);
  });

  it('should login successfully through form data', (done)=>{   
    component.ngOnInit();
    component.loginForm.controls['userid'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin@123');
    
    let loginStatus = authService.login(component.loginForm.value).then(data=> {
      expect(data).toBeTruthy();
      done();
    });
      let newsRequest = httpMock.expectOne('https://www.npoint.io/documents/680bba8d293902089d18');
    newsRequest.flush({contents: [{userId:'admin', password:'admin@123'}]});
    httpMock.verify();
    
    done
  });  
  
  it('should login failed when wrong data submitted', (done)=>{   
    component.ngOnInit();
    component.loginForm.controls['userid'].setValue('admin');
    component.loginForm.controls['password'].setValue('admi123');
    
    let loginStatus = authService.login(component.loginForm.value).then(data=> {
      expect(data).toBeFalsy();
      done();
    });
      let newsRequest = httpMock.expectOne('https://www.npoint.io/documents/680bba8d293902089d18');
    newsRequest.flush({contents: [{userId:'admin', password:'admin@123'}]});
    httpMock.verify();
    
    done
  });  



});
