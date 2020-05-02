import { Component, SimpleChanges } from '@angular/core';
import  { AuthService } from './core/services/auth.service'
import { Router } from '@angular/router';  
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Covid-App';

  show:boolean=false;
  currentUser:any;
  loginSubscribe: Subscription;
  
  constructor(private authService: AuthService, private router: Router){    
  }

  ngOnInit(): void {
    this.loginSubscribe = this.authService.currentUser.subscribe(x => 
          {
            console.log("Login Useer======",x)
            this.currentUser = x
          }
        );
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['/dashboard'])
  }

  ngOnDestroy() {
    this.loginSubscribe.unsubscribe();
    console.log("ngOnDestroy");
  }
}  

