import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-edit-post',
    templateUrl: './edit-post.component.html',
    styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit {
    index:number;
    id:string;
    editPostForm:FormGroup;

    constructor(
        private route:ActivatedRoute,
        private postsService:PostsService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(
            (params:Params) => {
                this.index = params['index'];
                this.id = params['id'];
            }
        );

        const post = this.postsService.readPost(this.index);

        this.editPostForm = new FormGroup({
            'name':         new FormControl(post.name, Validators.required),
            'body':         new FormControl(post.body, Validators.required),
            'author':       new FormControl(post.author, Validators.required),
            'category_id':  new FormControl(post.category_id, Validators.required),
            'published_at': new FormControl(post.published_at, Validators.required)
        });
    }
    
    submitForm() {
        this.postsService.updatePostFromServer(this.id, this.editPostForm.value);
        this.postsService.updatePost(this.index, this.editPostForm.value);
    }
}
