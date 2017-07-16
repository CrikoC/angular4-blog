import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Category} from "./categories.model";
import {Subject} from "rxjs/Subject";
import { Router } from '@angular/router';
import {FlashMessagesService} from "angular2-flash-messages/module/flash-messages.service";

@Injectable()

export class CategoriesService{
    categoriesChanged = new Subject<Category[]>();

    //this array will be populated from the database
    private categories:Category[] = [];
    category:Category;

    constructor(
        private http:Http,
        private router:Router,
        private msg:FlashMessagesService

    ) { }

    setCategories(categories:Category[]) {
        //populating the categories array
        this.categories = categories;
        this.categoriesChanged.next(this.categories.slice());
    }

    setCategory(category:Category) {
        //populating the categories array
        this.category = category;
    }

    createCategory(category:Category) {
        //pushing the new category to the array
        this.categories.push(category);
        this.categoriesChanged.next(this.categories.slice());
    }

    readCategories() {
        //returning a copy of the categories array
        return this.categories.slice();
    }

    readCategory(index:number) {
        return this.categories[index];
    }

    updateCategory(index:number, category:Category) {
        this.categories[index] = category;
        this.categoriesChanged.next(this.categories.slice());
    }

    deleteCategory(index:number) {
        this.categories.splice(index,1);
        this.categoriesChanged.next(this.categories.slice());
    }

     getCategoryFromServer(id:string) {
         return this.http.get('http://localhost:3000/api/categories/' + id)
             .map(
                 (response:Response) => {
                     const category:Category = response.json();
                     return category;
                 }
             )
             .subscribe(
                 (category:Category) => {
                     //insert the categories from server to the posts array
                     this.setCategory(category);
                 }
             );
     }

    getCategoriesFromServer() {
        return this.http.get('http://localhost:3000/api/categories/')
        .map(
            (response:Response) => {
                const categories:Category[] = response.json();
                return categories;
            }
        )
        .subscribe(
            (categories:Category[]) => {
                //insert the categories from server to the posts array
                this.setCategories(categories);
            }
        );
    }

    addCategoryToServer(category:Category) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers:headers});

        return this.http.post('http://localhost:3000/api/categories/add', category ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Category[]) => {
                if(data) {
                    this.getCategoriesFromServer();
                    this.msg.show('Category submitted!', { cssClass: 'alert-success', timeout: 2000 });
                    this.router.navigate(['categories']);
                } else {
                    this.msg.show('Error while adding category.', { cssClass: 'alert-danger', timeout: 2000 });
                }
            }
        )
    }

    updateCategoryFromServer(id:string, category:Category) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers: headers});

        return this.http.put('http://localhost:3000/api/categories/' + id, category, options)
        .map((response:Response) => response.json())
        .subscribe(
            (data:Category[]) => {
                if(data) {
                    this.getCategoriesFromServer();
                    this.msg.show('Category updated!', { cssClass: 'alert-success', timeout: 2000 });
                    this.router.navigate(['categories']);
                }
            }
        );
    }

    deleteCategoryFromServer(id:string) {
        const headers = new Headers({'Content-Type':'application/json'});
        const options = new RequestOptions({headers:headers});

        return this.http.delete('http://localhost:3000/api/categories/' + id ,options)
        .map((response:Response) => response.json())
        .subscribe(
            (data) => {
                this.getCategoriesFromServer();
                this.router.navigate(['categories']);
                this.msg.show('Category deleted!', {cssClass: 'alert-success', timeout: 2000});
            }
        );
    }
}