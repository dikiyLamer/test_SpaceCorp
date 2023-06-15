import { Injectable } from "@nestjs/common";


@Injectable()
export class AuthService{

    constructor(){

    }

    async validateUser (login: string, pass: string): Promise<Admin | undefined>{
        const admin = await this.adminRepository.findByLogin(login)
        console.log(admin)

        if (admin && admin.password === pass){
            const {password, ...secureAdmin} = admin
            return secureAdmin
        }
        else {
            return null
        }
    }
}