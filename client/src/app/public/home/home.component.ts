import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {Category} from "../../admin/categories/categories.model";
import {CategoriesService} from "../../admin/categories/categories.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    categories:Category[];
    subscription:Subscription;

    constructor(private categoriesService:CategoriesService) { }

    ngOnInit() {
        this.subscription = this.categoriesService.categoriesChanged
        .subscribe(
            (categories:Category[]) => {
                this.categories = categories;
            }
        );
        
        this.categoriesService.getCategoriesFromServer();
        this.categories = this.categoriesService.readCategories();
    }
}
