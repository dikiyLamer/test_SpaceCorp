import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  
 title = 'black'
 /**
  *
  */
 constructor(
            // private authService: AuthService,
             private router: Router) {
  
  
 }
  ngOnInit(): void {

    
    localStorage.getItem('token') ?  this.router.navigateByUrl('moovies') : this.router.navigateByUrl('login')
  }
}
