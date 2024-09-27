import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
class Rating {
  @Prop()
  count: number;

  @Prop()
  average: number;
}

const RatingSchema = SchemaFactory.createForClass(Rating);

@Schema()
export class Host extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  phone: string;

  @Prop([String])
  property_id: string[];

  @Prop()
  picture: string;

  @Prop()
  about: string;

  @Prop()
  government_id: string;

  @Prop()
  identity_card: string;

  @Prop()
  identity_verified: boolean;

  @Prop()
  birth_date: Date;

  @Prop()
  birth_place: string;

  @Prop({ type: RatingSchema })
  rating: Rating;
}

export const HostSchema = SchemaFactory.createForClass(Host);
