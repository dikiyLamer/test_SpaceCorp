import { Body, Controller, Get, Post, UseGuards,Request } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('api/auth')
export class AuthController { 
  constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req){
        console.log(req.user)
        this.authService.validateUser(req.user.login, req.user.password)
    }


}
