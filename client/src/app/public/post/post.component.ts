import { Component, OnInit } from '@angular/core';
import {PostsService} from "../../admin/posts/posts.service";
import { ActivatedRoute,Params } from '@angular/router';
import {Post} from "../../admin/posts/posts.model";
import { Location } from '@angular/common';
import {Category} from "../../admin/categories/categories.model";
import {CategoriesService} from "../../admin/categories/categories.service";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    index:number;
    id:string;
    post:Post;
    category:Category;

    constructor(
        private postsService:PostsService,
        private categoriesService:CategoriesService,
        private route:ActivatedRoute,
        private location:Location
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.index = params['index'];
                this.id = params['id'];
                this.post = this.postsService.readPost(this.index);
                
                this.categoriesService.getCategoryFromServer(this.post.category_id);
                this.category = this.categoriesService.category
            }
        );
    }

    goToCategory() {
        this.location.back();
    }

}
