import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginUserForm:FormGroup;

    constructor(
        private usersService:UsersService
    ) { }
    
    ngOnInit() {
        this.loginUserForm = new FormGroup({
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required),
        });
    }

    submitForm() {
        this.usersService.authenticateUser(this.loginUserForm.value);
    }

}
