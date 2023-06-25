import { Component, OnDestroy, OnInit } from '@angular/core';
import { MooviesService } from '../services/moovies.service';
import { Subscription, map } from 'rxjs';
import { Moovie } from '../interfaces/moovie.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moovies',
  templateUrl: './moovies.component.html',
  styleUrls: ['./moovies.component.scss']
})
export class MooviesComponent implements OnInit, OnDestroy{

  mooviesGetSub$!: Subscription

  moovies: Moovie[] = []

  openPopup: boolean = false

  mooviePopup!: Moovie 

  toCreate = false

  compareUpFlag = false

  role: string | null = localStorage.getItem('role')

  constructor(private mooviesService: MooviesService,
              private router: Router) {
                this.router.routeReuseStrategy.shouldReuseRoute = () => {
                  return false;
                };
  }
  ngOnInit(): void {
    this.mooviesGetSub$ = this.mooviesService.getMoovies()
    .pipe(
      
      map(data => {
      let fileReader: FileReader = new FileReader();
      console.log(data);
      
      // (data as Moovie[]).forEach((elem ) => {
      //   elem.image ? console.log(123, elem.image) : elem.image
      //   elem.image ? fileReader.readAsDataURL( elem.image.buffer)
      //   elem.image = fileReader.result
      // }
      // );
      
      
      return data
    }))
    .subscribe(data => this.moovies = data as Moovie[])
  }
  ngOnDestroy(): void {
    this.mooviesGetSub$.unsubscribe()
  }

  popupOpen(moovie: Moovie){
    this.mooviePopup = moovie
    this.openPopup = !this.openPopup
    
  }

  popupOpenToCreate(){

    this.openPopup = !this.openPopup
    this.toCreate = true

  }

  onDeclinePopup(){
    this.openPopup = !this.openPopup
    
  }

  deleteMoovie(moovie : Moovie){
    this.mooviesService.deleteMoovie(moovie).subscribe(data => console.log('delete: ', data))
  }

  onNotToCreate(){
    this.toCreate = false
  }

  sortArray(){
    this.compareUpFlag = !this.compareUpFlag
    this.moovies.sort((a,b) => this.compareUpFlag ? this.compareUp(a,b) : this.compareDown(a,b))
  }

  logout(){
    localStorage.clear()
    this.router.navigateByUrl('/moovies');

  }

  compareUp(a: Moovie, b: Moovie): number {
    if (a.rating < b.rating) {
      return -1;
    }
    if (a.rating > b.rating) {
      return 1;
    }
    return 0;
  }

  compareDown(a: Moovie, b: Moovie): number {
    if (a.rating > b.rating) {
      return -1;
    }
    if (a.rating < b.rating) {
      return 1;
    }
    return 0;
  }
}
