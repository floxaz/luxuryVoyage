import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  error: string = null;
  isLogin = true;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9a-zA-Z,. !]{6,}/)])
    });

    if (this.router.url === '/signup') {
      this.isLogin = false;

      this.authForm.get('password').setValidators([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/^[0-9a-zA-Z,. !]/),
        this.compareToRepeatPassword.bind(this)
      ]);
      this.authForm.addControl('repeatPassword', new FormControl(null, [
        Validators.required,
        this.comparePassword.bind(this)
      ]));

    } else {
      this.authForm.get('password').setValidators([
        Validators.required,
        Validators.pattern(/^[0-9a-zA-Z,. !]/),
      ]);
    }
  }

  compareToRepeatPassword(control: FormControl) {
    if (this.authForm.get('repeatPassword').value && control.value !== this.authForm.get('repeatPassword').value) {
      this.authForm.get('repeatPassword').setErrors({
        invalidPassword: true
      });
    } else {
      this.authForm.get('repeatPassword').setErrors({
        invalidPassword: null
      });
    }
  }

  comparePassword(control: FormControl) {
    if (control.value !== this.authForm.get('password').value) {
      return {
        invalidPassword: true
      };
    }
  }

  onSubmit() {
    this.isLoading = true;
    let req: Observable<any>;
    if (this.isLogin) {
      req = this.authService.login(this.authForm.value.email, this.authForm.value.password);
    } else {
      req = this.authService.signUp(this.authForm.value.email, this.authForm.value.password);
    }

    req.subscribe(result => {
      console.log(result);
      this.isLoading = false;
      this.router.navigate(['/offers']);
    }, message => {
      this.error = message;
      this.isLoading = false;
    });
  }
}
