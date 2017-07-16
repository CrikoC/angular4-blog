import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UsersService } from '../users/users.service';

@Injectable()

export class AuthGuard implements CanActivate {
    constructor(private usersService:UsersService) {}

    canActivate() {
        if(this.usersService.loggedIn()) {
            return true;
        }
    }
}