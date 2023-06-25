import { Body, Controller, Get, Post, UseGuards,Request, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserDTO } from '../../models/user.model';
import { AuthGuard } from '../../guards/auth.guard';


@Controller('api/auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() data){

        return this.authService.login(data.login, data.password)
    }


    @Post('register')
    async register(@Body() data){
        const user = new UserDTO()
        user.login = data.login
        user.password = data.password
        return this.authService.register(user)
    }

    @UseGuards(AuthGuard)
    @Get()
    async getUsers(){
      return this.authService.getUsers()
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUsers(@Param('id') id : string){
      return this.authService.deleteUsers(id)
    }
}
