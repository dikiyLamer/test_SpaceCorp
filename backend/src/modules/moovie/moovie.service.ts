import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageModel } from "src/models/image.model";
import { MoovieCreate } from "src/models/moovie.create.model";
import { MoovieUpdate } from "src/models/moovie.update.model";
import { ImageDocument, Image } from "src/schemas/image.schema";
import { Moovie, MoovieDocument } from "src/schemas/moovie.schema";


@Injectable()
export class MoovieService{

    constructor(

        @InjectModel(Moovie.name) private moovieModel: Model<MoovieDocument>,
        @InjectModel(Image.name) private imageModel: Model<ImageDocument>
        
        ){}


        async getMoovies(){
             
            let moovies = await this.moovieModel.find()
            // console.log(moovies);
            
            moovies.forEach(elem => elem.image.buffer ? Buffer.from(elem.image.buffer).toString('base64') : elem)
            return moovies
        }

        async getMoovieById(id: string){
            return this.moovieModel.findById(id)
        }

        async createMoovie(moovie: MoovieCreate){
            const createMoovie = new this.moovieModel(moovie)
            return createMoovie.save()
        }

        async updateMoovie(moovie: MoovieUpdate){
            return this.moovieModel.findByIdAndUpdate(moovie._id, moovie)
        }
        
        async deleteMoovie(moovieId: string){
            return this.moovieModel.findByIdAndRemove(moovieId)
        }

        async updateMoovieWithImage(image: any){
            let moovie = await this.getMoovieById(image.originalname) as unknown as MoovieUpdate
            image.buffer = 'data:image/jpeg;base64,' + Buffer.from(image.buffer).toString('base64')
            moovie.image = image
            console.log(image);
            
            console.log(Object.keys(image));
            
            return this.updateMoovie(moovie)
        }

        
        async getImages(){
            return this.imageModel.find()
        }

        async getImageById(id: string){
            return this.imageModel.findById(id)
        }

        async createImage(image: ImageModel){
            const createMoovie = new this.imageModel(image)
            return createMoovie.save()
        }

        async updateImage(image: ImageModel){
            return this.imageModel.findByIdAndUpdate(image._id, image)
        }
        
        async deleteImage(image: ImageModel){
            return this.imageModel.findByIdAndRemove(image._id)
        }

}