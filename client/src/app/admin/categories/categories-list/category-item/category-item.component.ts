import { Component, OnInit, Input } from '@angular/core';
import {Category} from "../../categories.model";

@Component({
    selector: 'app-category-item',
    templateUrl: './category-item.component.html',
    styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
    @Input() category:Category;
    @Input() index: number;
    constructor() { }

    ngOnInit() {}
}

