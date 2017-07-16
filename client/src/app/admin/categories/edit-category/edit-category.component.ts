import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from "../categories.service";

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.css']
})

export class EditCategoryComponent implements OnInit {
    index:number;
    id:string;
    editCategoryForm:FormGroup;

    constructor(
        private route:ActivatedRoute,
        private categoriesService:CategoriesService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.index = params['index'];
                this.id = params['id'];
            }
        );

        const category = this.categoriesService.readCategory(this.index);

        this.editCategoryForm = new FormGroup({
            'name':         new FormControl(category.name, Validators.required),
            'body':         new FormControl(category.body, Validators.required)
        });
    }
    
    submitForm() {
        this.categoriesService.updateCategoryFromServer(this.id, this.editCategoryForm.value);
        this.categoriesService.updateCategory(this.index, this.editCategoryForm.value);
    }
}
