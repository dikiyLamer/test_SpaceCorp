import { Injectable } from "@nestjs/common";
import { UserDTO } from "../../models/user.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../../schemas/user.schema";
import { Model } from "mongoose";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";


@Injectable()
export class AuthService{

    usersArray =  [{login: "user",
    password: "user",
    roles: ["user"],},
    {login: "admin",
    password: "admin",
    roles: ["admin"],}]



    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>
        // @InjectRepository(User) private usersRepository: Repository<User>,
        )
        {

    }

    async login (login: string, pass: string): Promise<{access_token: string} | undefined>{

 
        const user =  this.usersArray.find(user => user.login === login)
        // await this.userModel.find({login: login})
        

        if (user?.password === pass){
            const {password, ...secureAdmin} = user
            return {
                access_token: await this.jwtService.signAsync(secureAdmin)
            }
        }
        else {
            return null
        }
    }

    async register (user: UserDTO){

        user.roles = [Role.User]
        const createdUser = new this.userModel(user)

        return createdUser.save()

    }


    async getUsers(){
        return this.userModel.find()
    }

    async deleteUsers(id: string){
        return this.userModel.findByIdAndRemove(id)
    }
}