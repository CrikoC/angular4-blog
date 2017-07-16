import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Post} from "./posts.model";
import {Subject} from "rxjs/Subject";
import { Router,ActivatedRoute } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages/module/flash-messages.service";
import {Location} from '@angular/common';
@Injectable()

export class PostsService{
    postsChanged = new Subject<Post[]>();

    //this array will be populated from the database
    private posts:Post[] = [];

    constructor(
        private http:Http,
        private router:Router,
        private route:ActivatedRoute,
        private msg:FlashMessagesService,
        private location:Location


    ) { }


    setPosts(posts:Post[]) {
        //populating the posts array
        this.posts = posts;
        this.postsChanged.next(this.posts.slice());
    }

    createPost(post:Post) {
        //pushing the new post to the array
        this.posts.push(post);
        this.postsChanged.next(this.posts.slice());
    }

    readPosts() {
        //returning a copy of the posts array
        return this.posts.slice();
    }

    readPost(index:number) {
        return this.posts[index];
    }

    updatePost(index:number, post:Post) {
        this.posts[index] = post;
        this.postsChanged.next(this.posts.slice());
    }

    deletePost(index:number) {
        this.posts.splice(index,1);
        this.postsChanged.next(this.posts.slice());
    }

    getPostFromServer(id:string) {
        return this.http.get('http://localhost:3000/api/posts/' + id)
        .subscribe((response:Response) => response.json());
    }

    getPostsFromServer(category_id) {
        return this.http.get('http://localhost:3000/api/posts/' + category_id)
        .map(
            (response:Response) => {
                const posts:Post[] = response.json();
                return posts;
            }
        )
        .subscribe(
            (posts:Post[]) => {
                //insert the posts from server to the posts array
                this.setPosts(posts);
            }
        );
    }

    addPostToServer(post:Post) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers:headers});

        return this.http.post('http://localhost:3000/api/posts/add', post ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Post[]) => {
                if(data) {
                    this.getPostsFromServer(post.category_id);
                    this.msg.show('Post submitted!', { cssClass: 'alert-success', timeout: 2000 });
                    this.location.back();
                    this.setPosts(this.posts);
                } else {
                    this.msg.show('Error while adding post.', { cssClass: 'alert-danger', timeout: 2000 });
                }
            }
        )
    }

    updatePostFromServer(id:string, post:Post) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.put('http://localhost:3000/api/posts/' + id, post, options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Post[]) => {
                if(data) {
                    this.msg.show('Post updated!', { cssClass: 'alert-success', timeout: 2000 });
                    this.location.back();
                    this.getPostsFromServer(post.category_id);
                }
            }
        );
    }

    deletePostFromServer(id:string) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers:headers});

        return this.http.delete('http://localhost:3000/api/posts/' + id ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data) => {
                this.msg.show('Post deleted!', {cssClass: 'alert-success', timeout: 2000});
                this.location.back();
                this.getPostsFromServer(data.category_id);
            }
        );
    }
}