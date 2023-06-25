import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MoovieDocument = HydratedDocument<Moovie>;

@Schema()
export class Moovie {

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  rating: number;

  @Prop()
  views: number;

  @Prop(raw({
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    originalmimetypename: { type: String },
    buffer: { type: String },
    size: { type: Number },
  }))
  image: Record<string, any>;

}

export const MoovieSchema = SchemaFactory.createForClass(Moovie);