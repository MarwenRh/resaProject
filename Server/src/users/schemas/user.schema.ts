import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })  // Disable the __v field here
export class User extends Document {
  @Prop({ required: true })
  email: string;

  @Prop({ required: false })
  password?: string; // Optional
}

export const UserSchema = SchemaFactory.createForClass(User);
