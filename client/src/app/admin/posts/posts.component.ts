import { Component, OnInit} from '@angular/core';
import {UsersService} from "../users/users.service";


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css'],
})

export class PostsComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }
}