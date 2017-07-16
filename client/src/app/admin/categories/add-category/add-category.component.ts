import { Component, OnInit  } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import {UsersService} from "../../users/users.service";
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent implements OnInit {
    addCategoryForm:FormGroup;
    username:string;

    constructor(
        private categoriesService:CategoriesService,
        private usersService:UsersService
    ) { }

    ngOnInit() {
        this.username = this.usersService.user.username;

        this.addCategoryForm = new FormGroup({
            'name':         new FormControl(null, Validators.required),
            'body':         new FormControl(null)
        });

    }

    submitForm() {
        this.categoriesService.createCategory(this.addCategoryForm.value);
        this.categoriesService.addCategoryToServer(this.addCategoryForm.value);
    }
}
