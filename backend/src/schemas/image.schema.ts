import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema()
export class Image {

    @Prop()
    _id: string;
    
    @Prop()
    image: string;


}

export const ImageSchema = SchemaFactory.createForClass(Image);