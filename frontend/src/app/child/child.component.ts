import { Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, fromEvent, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Auth } from '../interfaces/user.interface';
import { Router } from '@angular/router';
@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  loginInputInvalid: boolean = false
  passwordInputInvalid: boolean = false


  /**
   *
   */
  constructor(private authService: AuthService,
              private router: Router) {
    
    
  }

  ngOnInit(): void {
    fromEvent(this.loginField.nativeElement, 'blur').subscribe(() => 
    {
      
      this.myForm.get('login')?.invalid ? this.loginInputInvalid = true :  this.loginInputInvalid = false
    })

    fromEvent(this.passwordField.nativeElement, 'blur').subscribe(() => 
    {
      
      this.myForm.get('password')?.invalid ? this.passwordInputInvalid = true :  this.passwordInputInvalid = false
    })

  }

  classs: boolean = true

  @ViewChild('loginField', {static : true})
  loginField!: ElementRef<any>

  @ViewChild('passwordField', {static : true})
  passwordField!: ElementRef<any>

  

  myForm: FormGroup = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [Validators.required, Validators.minLength(4)])  
  })

  async handle(){
    
    
    await this.authService.login(this.myForm.value)
    this.router.navigateByUrl('moovies')
    
  }
}
