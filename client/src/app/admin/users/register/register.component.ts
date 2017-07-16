import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    registerUserForm:FormGroup;

    constructor(
        private usersService:UsersService
    ) { }

    ngOnInit() {
        this.registerUserForm = new FormGroup({
            'name':     new FormControl(null),
            'email':    new FormControl(null, Validators.required),
            'username': new FormControl(null, Validators.required),
            'password': new FormControl(null, Validators.required),
        });
    }

    submitForm() {
        this.usersService.registerUser(this.registerUserForm.value);
    }
}