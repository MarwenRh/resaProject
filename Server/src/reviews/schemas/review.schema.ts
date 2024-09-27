import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Review extends Document {
  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  listing_id: string;

  @Prop({ required: true })
  reviewer_id: string;

  @Prop({ required: true })
  reviewer_name: string;

  @Prop({ required: true })
  comment: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
