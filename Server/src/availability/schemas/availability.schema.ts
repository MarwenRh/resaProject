import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
class Slot {
  @Prop({ required: true })
  start_time: Date;

  @Prop({ required: true })
  end_time: Date;

  @Prop()
  price: string;
}

const SlotSchema = SchemaFactory.createForClass(Slot);

@Schema()
export class Availability extends Document {
  @Prop({ required: true })
  property_id: string;

  @Prop({ type: [SlotSchema], default: [] })
  available_slots: Slot[];
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
