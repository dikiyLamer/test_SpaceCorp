import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { MoovieModule } from './modules/moovie/moovie.module';

@Module({
  imports: [AuthModule,
    MoovieModule,
    MongooseModule.forRoot('mongodb://user:user@mongodb:27017/cinema'),
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '600s' },
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
