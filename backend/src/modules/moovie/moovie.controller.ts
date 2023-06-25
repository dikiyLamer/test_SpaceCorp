import { Body, Controller, Get, Post, UseGuards, Put, Delete, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { MoovieService } from './moovie.service';
import { MoovieUpdate } from 'src/models/moovie.update.model';
import { MoovieCreate } from 'src/models/moovie.create.model';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('api/moovies')
@UseGuards(AuthGuard)
export class MoovieController { 
  constructor(private readonly moovieService: MoovieService) {}

//получает список всех фильмов;
@Get()
getMoovies(){
    return this.moovieService.getMoovies()
} 

//добавляет новый фильм;
@Post()
createMoovie(@Body() moovie: MoovieCreate){
    return this.moovieService.createMoovie(moovie)
}

//получает информацию о фильме по его id;
@Get(':id')
getInfoById(@Param() id: string){
    return this.moovieService.getMoovieById(id)
}

//обновляет информацию о фильме по его id;
@Put()
updateMoovie(@Body() moovie: MoovieUpdate){
    console.log(moovie);
    
    this.moovieService.updateMoovie(moovie)
}

//удаляет фильм по его id.
@Delete()
deleteMoovie(@Body() moovieId: {id: string}){
    console.log(moovieId);
    
    this.moovieService.deleteMoovie(moovieId.id)
}

@Get('image')
getImages(){
    return this.moovieService.getMoovies()
} 

//добавляет новый фильм;
@Post('image')
@UseInterceptors(FileInterceptor('image'))
createImages(@UploadedFile() image){
    
    return this.moovieService.updateMoovieWithImage(image)
}



}
