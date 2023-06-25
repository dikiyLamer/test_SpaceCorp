import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { MoovieController } from './moovie.controller';
import { MoovieService } from './moovie.service';
import { Moovie, MoovieSchema } from 'src/schemas/moovie.schema';
import { ImageSchema, Image } from 'src/schemas/image.schema';



@Module({
  imports: [  PassportModule,
              MongooseModule.forFeature([
                {name: Moovie.name, schema : MoovieSchema},
                {name: Image.name, schema : ImageSchema}
              ])     
            ],
  controllers: [MoovieController],
  providers: [MoovieService],
})
export class MoovieModule {}
