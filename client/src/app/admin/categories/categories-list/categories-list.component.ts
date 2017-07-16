import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {CategoriesService} from "../categories.service";
import {Subscription} from "rxjs/Subscription";
import { trigger, state, style, transition, animate } from '@angular/animations';
import {Category} from "../categories.model";

@Component({
    selector: 'app-categories-list',
    templateUrl: './categories-list.component.html',
    styleUrls: ['./categories-list.component.css'],
    animations: [
        trigger('category_item', [
            state('in', style({
                opacity: 1,
                transform: 'translateX(0)'
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                    transform: 'translateX(0)'
                }),
                animate(300)
            ]),
            transition('* => void', [
                animate(300, style({
                    opacity: 0,
                    transform: 'translateX(0)'
                }))
            ]),
        ]),
    ]
})
export class CategoriesListComponent implements OnInit,OnDestroy {
    categories:Category[];
    subscription:Subscription;

    constructor(
        private categoriesService:CategoriesService,
        private router:Router,
        private route:ActivatedRoute
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

    goToAddCategory() {
        this.router.navigate(['add'], {relativeTo:this.route});
    }
    

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
