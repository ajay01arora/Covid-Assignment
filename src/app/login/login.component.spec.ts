import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../core/services/auth.service';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de : DebugElement;
  let el : HTMLElement;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set submitted to true', (done)=>{
    
    component.loginForm.controls['userid'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin@123');
    component.login();
    expect(component.submitted).toBeTruthy();
    done
  });  

  it('should call the onlogin method'), (done) =>{
    fixture.detectChanges();
    spyOn(component,'login');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(0);
    done
  };

  it('form should be invalid'), (done) =>{
    component.loginForm.controls['userid'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
    done
  };

  it('form should be valid'), (done) =>{
    component.loginForm.controls['userid'].setValue('admin');
    component.loginForm.controls['password'].setValue('admin@123');
    expect(component.loginForm.valid).toBeTruthy();
    done

  };

});
