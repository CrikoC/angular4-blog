import { Component, OnInit } from '@angular/core';
import { UsersService } from "../../admin/users/users.service";
import {Category} from "../../admin/categories/categories.model";
import {Subscription} from "rxjs/Subscription";
import {CategoriesService} from "../../admin/categories/categories.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    categories:Category[];
    subscription:Subscription;
    constructor(
        private usersService:UsersService,
        private categoriesService:CategoriesService
    ) { }

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

    onLogout() {
        this.usersService.logout();
        console.log('logged out!');
        return false;
    }
}
