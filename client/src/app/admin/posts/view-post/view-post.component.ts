import { Component, OnInit } from '@angular/core';
import {PostsService} from "../posts.service";
import { Router,ActivatedRoute, Params } from '@angular/router';
import {Post} from "../posts.model";

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
    index:number;
    id:string;
    post:Post;

    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private postsService:PostsService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.index = params['index'];
                this.id = params['id'];
                this.post = this.postsService.readPost(this.index);
            }
        );
    }

    goToEditPost() {
        this.router.navigate(['edit'], {relativeTo:this.route});    }

    deletePost(index:number) {
        this.postsService.deletePost(index);
        this.postsService.deletePostFromServer(this.id);
    }
}
