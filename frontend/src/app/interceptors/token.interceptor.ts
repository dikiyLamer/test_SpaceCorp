import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable, tap } from "rxjs"
import { AuthService } from "../services/auth.service"
import { Router } from "@angular/router"

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
                 private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', <string>localStorage.getItem('token') ? `Bearer ${<string>localStorage.getItem('token')}` : ''),
    })

    return next.handle(authReq).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse)
         
            console.log('Server response')
        },
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
            localStorage.removeItem('token')
            this.router.navigateByUrl('/login')
              console.log('Unauthorized')
          }
        }
      )
    )
  }
}