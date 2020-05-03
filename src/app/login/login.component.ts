import {
  Component,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {
  Router
} from '@angular/router';
import {
  AuthService
} from '../core/services/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
      if (this.authService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  loginForm: FormGroup;
  message: string;
  error: any;
  submitted: Boolean = false;

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          userid: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  get f() {
      return this.loginForm.controls;
  }

  async login() {
      this.submitted = true;
      // stop here if form is invalid  
      if (this.loginForm.invalid) {
          return;
      }
      const loginData = await this.authService.login(this.loginForm.value);

      if (loginData) {
          console.log("data====", loginData)
          this.router.navigate(['/news']);
      } else {
          this.message = "Please check your userid and password";
      }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(`ngOnChanges - data is ${this.f.name}`);

    for (let key in changes) {
      console.log(`${key} changed.
      Current: ${changes[key].currentValue}.
      Previous: ${changes[key].previousValue}`);
    }
  }


  ngOnDestroy() {
    this.loginForm = null;
    this.message = null;
    this.error=null;
    this.submitted =null;
    console.log("Login component destroyed");
  }
}