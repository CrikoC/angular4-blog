import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';

import { AppComponent }             from './app.component';
import { HeaderComponent }          from './public/header/header.component';
import { FooterComponent }          from './public/footer/footer.component';
import { HomeComponent }            from './public/home/home.component';
import { CategoryComponent }        from "./public/category/category.component";
import { PostComponent }            from './public/post/post.component';
import { PostsComponent }           from './admin/posts/posts.component';
import { EditPostComponent }        from './admin/posts/edit-post/edit-post.component';
import { AddPostComponent }         from './admin/posts/add-post/add-post.component';
import { ViewPostComponent }        from './admin/posts/view-post/view-post.component';
import { CategoriesComponent }      from './admin/categories/categories.component';
import { EditCategoryComponent }    from "./admin/categories/edit-category/edit-category.component";
import { AddCategoryComponent }     from "./admin/categories/add-category/add-category.component";
import { ViewCategoryComponent }    from "./admin/categories/view-category/view-category.component";
import { CategoryItemComponent }    from "./admin/categories/categories-list/category-item/category-item.component";
import { CategoriesListComponent }  from "./admin/categories/categories-list/categories-list.component";
import { RegisterComponent }        from './admin/users/register/register.component';
import { LoginComponent }           from './admin/users/login/login.component';
import { ProfileComponent }         from './admin/users/profile/profile.component';

import { Routes,RouterModule }      from '@angular/router';
import { ReactiveFormsModule }      from '@angular/forms';
import { HttpModule }               from "@angular/http";
import { FlashMessagesModule }      from "angular2-flash-messages/module/module";
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';

import { PostsService }             from './admin/posts/posts.service';
import { UsersService }             from "./admin/users/users.service";
import { PostItemComponent }        from './admin/posts/posts-list/post-item/post-item.component';
import { PostsListComponent }       from './admin/posts/posts-list/posts-list.component';
import { ShortenPipe }              from "./shorten.pipe";
import { AuthGuard }                from "./admin/guard/auth.guard";
import { CategoriesService }        from "./admin/categories/categories.service";

const appRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:'category/:index/:id', component:CategoryComponent},
    {path:'post/:index/:id', component:PostComponent},
    {path:'categories', component:CategoriesComponent, canActivate:[AuthGuard], children:[
        {path:'add', component:AddCategoryComponent},
        {path:':index/:id', component:ViewCategoryComponent, children:[
            {path:'', component:PostsComponent, children:[
                {path:'add', component:AddPostComponent},
                {path:':index/:id', component:ViewPostComponent },
                {path:':index/:id/edit', component:EditPostComponent }
            ]},
        ]},
        {path:':index/:id/edit', component:EditCategoryComponent },
    ]},
    {path:'register', component:RegisterComponent},
    {path:'login', component:LoginComponent},
    {path:'profile', component:ProfileComponent, canActivate:[AuthGuard]}
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        HomeComponent,
        PostsComponent,
        EditPostComponent,
        AddPostComponent,
        ViewPostComponent,
        PostItemComponent,
        PostsListComponent,
        CategoriesComponent,
        EditCategoryComponent,
        AddCategoryComponent,
        ViewCategoryComponent,
        CategoryItemComponent,
        CategoriesListComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        ShortenPipe,
        CategoriesComponent,
        CategoryComponent,
        PostComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        ReactiveFormsModule,
        FlashMessagesModule,
        HttpModule,
        BrowserAnimationsModule,
    ],
    providers: [CategoriesService,PostsService,UsersService,AuthGuard],

    bootstrap: [AppComponent]
})
    export class AppModule { }
