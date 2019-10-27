import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    signupForm: FormGroup;
    isError: boolean = false;

    ngOnInit() {
        this.signupForm = new FormGroup({
            username: new FormControl(null, [Validators.required, this.controlName]),
            password: new FormControl(null, [Validators.required, this.controlPassword])
        });
    }

    controlName(control: FormControl) {
        const regex = new RegExp('^[0-9a-zA-Z.]');
        if(!regex.test(control.value)) {
            return {
                invalidName: true
            }
        }
    }

    controlPassword(control: FormControl) {
        const regex = new RegExp('^[0-9a-zA-Z,. !]{8,}');
        if(!regex.test(control.value)) {
            return {
                invalidPassword: true
            }
        }
    }

    onLogin() {
        console.log(this.signupForm);
        this.isError = true;
    }
}