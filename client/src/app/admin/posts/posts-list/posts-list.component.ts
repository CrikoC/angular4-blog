import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import {Post} from "../posts.model";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs/Subscription";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-posts-list',
    templateUrl: './posts-list.component.html',
    styleUrls: ['./posts-list.component.css'],
    animations: [
        trigger('post_item', [
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
export class PostsListComponent implements OnInit,OnDestroy {
    posts:Post[];
    category_id:string;
    subscription:Subscription;

    constructor(
        private postsService:PostsService,
        private router:Router,
        private route:ActivatedRoute
    ) { }


    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.category_id = params['id'];
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

        this.postsService.getPostsFromServer(this.category_id);
        this.posts = this.postsService.readPosts();
    }

    goToAddPost() {
        this.router.navigate(['add'], {relativeTo:this.route});
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
