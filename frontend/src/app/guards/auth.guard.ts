import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthGurad implements CanActivate, CanActivateChild{



    /**
     *
     */
    constructor(private authSerrvice: AuthService) {
        
        
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authSerrvice.isAuthorized()){
            return of(true)
        }
        return of(false)

        // return of(true)
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (this.authSerrvice.isAuthorized()){
            return of(true)
        }
        return of(false)

        // return of(true)
    }
    
}