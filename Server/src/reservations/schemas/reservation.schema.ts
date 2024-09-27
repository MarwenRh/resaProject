import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Reservation extends Document {
  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  property_id: string;

  @Prop()
  check_in_date: Date;

  @Prop()
  check_out_date: Date;

  @Prop()
  total_price: number;

  @Prop()
  status: string;

  @Prop()
  adult_guests: number;

  @Prop()
  minor_guests: number;

  @Prop()
  message: string;

  @Prop()
  cancellation_policy: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
