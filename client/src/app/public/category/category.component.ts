import { Component, OnInit, OnDestroy } from '@angular/core';
import {Category} from "../../admin/categories/categories.model";
import {Post} from "../../admin/posts/posts.model";
import { ActivatedRoute, Params } from '@angular/router';
import {CategoriesService} from "../../admin/categories/categories.service";
import {PostsService} from "../../admin/posts/posts.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit, OnDestroy {
    category:Category;
    category_id:string;
    index:number;
    posts:Post[];
    subscription:Subscription;

  constructor(
      private categoriesService:CategoriesService,
      private postsService:PostsService,
      private route:ActivatedRoute
  ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.category_id = params['id'];
                this.index = params['index'];
                this.category = this.categoriesService.readCategory(this.index);
                
                this.postsService.getPostsFromServer(this.category_id);
                this.posts = this.postsService.readPosts();
            }
        );

        this.subscription = this.postsService.postsChanged
            .subscribe(
                (posts:Post[]) => {
                    this.posts = posts;
                }
            );

        this.categoriesService.getCategoryFromServer(this.category_id);

        this.postsService.getPostsFromServer(this.category_id);
        this.posts = this.postsService.readPosts();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
