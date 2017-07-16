import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, Params } from '@angular/router';
import {Category} from "../categories.model";
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css']
})
export class ViewCategoryComponent implements OnInit {
    index:number;
    id:string;
    category:Category;

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private categoriesService:CategoriesService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.index = params['index'];
                this.id = params['id'];
                this.category = this.categoriesService.readCategory(this.index);
            }
        );
    }

    goToEditCategory() {
        this.router.navigate(['edit'], {relativeTo:this.route});    }

    deleteCategory(index:number) {
        this.categoriesService.deleteCategory(index);
        this.categoriesService.deleteCategoryFromServer(this.id);
    }
}
