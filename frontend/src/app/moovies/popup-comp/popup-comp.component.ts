import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Moovie } from 'src/app/interfaces/moovie.interface';
import { MooviesService } from 'src/app/services/moovies.service';


@Component({
  selector: 'app-popup-comp',
  templateUrl: './popup-comp.component.html',
  styleUrls: ['./popup-comp.component.scss']
})
export class PopupCompComponent implements OnInit {

  fs!: File 


  constructor(private moovieService: MooviesService){}


  ngOnInit(): void {
    console.log(this.moovie);
    
  }

  @Output()
  declineEvent: EventEmitter<boolean> = new EventEmitter()

  @Output()
  notToCreate: EventEmitter<boolean> = new EventEmitter()

  @Input()
  toCreate: boolean = false

  moovieForm: FormGroup = new FormGroup({
    name: new FormControl(),
    rating: new FormControl(),
    views: new FormControl(),
    description: new FormControl()
  })

  @Input()
  moovie!: Moovie

  async onSubmit(){
    if (this.toCreate){
      this.moovieService.craeteMoovie(this.moovieForm.value).subscribe(data => console.log('create:', data))
      
    }
    else{
      console.log(this.moovieForm.value);
      for (let key of Object.keys(this.moovieForm.value)){
        if(!this.moovieForm.value[key]){
          this.moovieForm.value[key] = this.moovie[key]
        }
      }
      this.moovieService.editMoovie({_id: this.moovie._id,...this.moovieForm.value}).subscribe(data => console.log(data))
  }
    
    this.declineEvent.emit(false)
    this.notToCreate.emit(false)
   
    // const data = await fs.promises.readFile(this.moovieForm.value.views);
    // console.log( this.fs.readAsArrayBuffer(this.moovieForm.value.views));
    // console.log( data);
    
  }

  onFileChange(event: any){
    
    // this.moovieForm.value.image = event.target.files[0]
    this.moovieService.addImage({_id: this.moovie._id, image: event.target.files[0]}).subscribe(data => console.log(data))
    
    
  }

  onDecline(){
    this.declineEvent.emit(false)
    this.notToCreate.emit(false)
  }
}
