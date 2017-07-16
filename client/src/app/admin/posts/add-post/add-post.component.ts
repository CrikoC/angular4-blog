import { Component, OnInit  } from '@angular/core';
import { PostsService } from '../posts.service';
import { FormGroup,FormControl,Validators } from '@angular/forms'
import { UsersService } from "../../users/users.service";
import { ActivatedRoute,Params } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {
    addPostForm:FormGroup;
    username:string;
    category_id:string;

    constructor(
        private postsService:PostsService,
        private usersService:UsersService,
        private route:ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.parent.params
        .subscribe(
            (params:Params) => {
                this.category_id = params['id'];
            }
        );

        this.username = this.usersService.user.username;

        this.addPostForm = new FormGroup({
            'name':         new FormControl(null, Validators.required),
            'body':         new FormControl(null, Validators.required),
            'author':       new FormControl(this.username, Validators.required),
            'image':        new FormControl('localhost:4200/admin/uploads/', Validators.required),
            'category_id':  new FormControl(this.category_id, Validators.required),
            'published_at': new FormControl(new Date, Validators.required),
        });

    }

    submitForm() {
        this.postsService.createPost(this.addPostForm.value);
        this.postsService.addPostToServer(this.addPostForm.value);
    }
}
