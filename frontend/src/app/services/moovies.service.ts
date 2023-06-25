import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MOOVIES_URL } from "src/environments/environment.dev";
import { Image } from "../interfaces/image.interface";
import { Moovie } from "../interfaces/moovie.interface";

@Injectable({providedIn : 'root'})
export class MooviesService{
    /**
     *
     */
    constructor(private http: HttpClient) {
    
    }

    getMoovies(){
        return this.http.get(MOOVIES_URL)
    }

    craeteMoovie(moovie: Moovie){
        return this.http.post(MOOVIES_URL, moovie)
    }

    editMoovie(moovie: Moovie){
        console.log(moovie);
        
        return this.http.put(MOOVIES_URL, moovie)
    }

    deleteMoovie(moovie: Moovie){
        return this.http.delete(MOOVIES_URL, {body: {id: moovie._id}})
    }

    addImage(image: Image){
        let file = new FormData()
        file.append('image',image.image, image._id )
        console.log(file);
        
        return this.http.post(`${MOOVIES_URL}/image`, file )
    }

    // createMoovie()
}