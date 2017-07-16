import { Injectable } from '@angular/core';
import { Http, Headers,Response,RequestOptions  } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import {FlashMessagesService} from "angular2-flash-messages/module/flash-messages.service";
import { Router } from '@angular/router';

@Injectable()

export class UsersService {
    authToken:any ='';
    user:any;

    constructor(
        private http:Http,
        private msg:FlashMessagesService,
        private router:Router
    ) { }

    registerUser(user:any){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        return this.http.post('http://localhost:3000/api/users/register', user ,options)
            .map((response:Response) => response.json())
            .subscribe(
                (data) => {
                    if(data.success) {
                        this.msg.show('User registered!', {cssClass:'alert alert-success', timeout:2000});
                        this.router.navigate(['login']);
                    } else {
                        this.msg.show('Error during registration', {cssClass:'alert alert-success', timeout:2000});
                    }
                }
            );
    }

    authenticateUser(user:any){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        return this.http.post('http://localhost:3000/api/users/authenticate', user ,options)
            .map((response:Response) => response.json())
            .subscribe(
                (data) => {
                    if(data.success) {
                        this.storeUserData(data.token, data.user);
                        this.msg.show('User logged in!', {cssClass:'alert alert-success', timeout:2000});
                        this.router.navigate(['profile']);
                        console.log(data);
                    } else {
                        this.msg.show(data.msg, {cssClass:'alert alert-danger', timeout:2000});
                        this.router.navigate(['login']);
                    }
                }
            );
    }

    getUserFromServer(user) {
        let headers = new Headers();
        this.loadToken();
        headers.append('Authorization', this.authToken);
        headers.append('Content-Type','application/json');
        let options = new RequestOptions({headers:headers});
        return this.http.get('http://localhost:3000/api/users/profile', options)
        .map((response:Response) => response.json())
        .subscribe(
            data => {
                user = data.user;
                return user;
            },
            err => {
                console.log(err);
                return false;
            }
        );
    }

    storeUserData(token, user) {
        localStorage.setItem('id_token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.authToken = token;
        this.user = user;
    }

    loadToken(){
        this.authToken = localStorage.getItem('id_token');
    }

    loggedIn() {
        return tokenNotExpired('id_token');

    }

    logout() {
        this.authToken = null;
        this.user = null;
        localStorage.clear();
        this.msg.show('logged out!', {cssClass:'alert alert-success', timeout:2000});
        this.router.navigate(['']);
    }
}